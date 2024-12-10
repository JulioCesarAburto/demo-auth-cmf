import {verifySession} from '../lib/dal';

interface DataApi {
  limit: number;
}
export const DataApi = async (value: DataApi) => {
  const session = await verifySession();
  if (!session) {
    // User is not authenticated
    return new Response(null, {status: 401});
  }

  try {
    const response = await fetch(
      'https://api.spacexdata.com/v5/launches/query',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: {success: true},
          options: {sort: {date_unix: 'asc'}},
          limit: value.limit,
        }),
      },
    );
    return await response.json();
  } catch (error) {
    console.log('Request failed:', error);
  }
};
