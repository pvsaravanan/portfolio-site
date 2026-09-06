import { NextResponse } from 'next/server';

const LEETCODE_USERNAME = 'saravananpv';

const QUERY = `
  query userProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
      profile {
        ranking
      }
      userCalendar {
        streak
        totalActiveDays
        submissionCalendar
      }
    }
  }
`;

// Revalidate at most once an hour — LeetCode's public GraphQL endpoint has no CORS
// headers for browser calls, so this route proxies it server-side for the client component.
export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: QUERY, variables: { username: LEETCODE_USERNAME } }),
      next: { revalidate },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch LeetCode data' }, { status: 502 });
    }

    const json = await res.json();
    const user = json?.data?.matchedUser;

    if (!user) {
      return NextResponse.json({ error: 'LeetCode user not found' }, { status: 404 });
    }

    const counts: Record<string, number> = {};
    for (const item of user.submitStatsGlobal?.acSubmissionNum ?? []) {
      counts[item.difficulty] = item.count;
    }

    let submissionCalendar: Record<string, number> = {};
    if (user.userCalendar?.submissionCalendar) {
      try {
        submissionCalendar = JSON.parse(user.userCalendar.submissionCalendar);
      } catch {
        submissionCalendar = {};
      }
    }

    return NextResponse.json({
      username: user.username,
      ranking: user.profile?.ranking ?? null,
      totalSolved: counts.All ?? 0,
      easySolved: counts.Easy ?? 0,
      mediumSolved: counts.Medium ?? 0,
      hardSolved: counts.Hard ?? 0,
      streak: user.userCalendar?.streak ?? 0,
      totalActiveDays: user.userCalendar?.totalActiveDays ?? 0,
      submissionCalendar,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch LeetCode data' }, { status: 500 });
  }
}
