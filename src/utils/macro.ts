export const macroDroidRequest = (
  deviceId: string,
  action: string,
  params: Record<string, unknown>,
) => {
  const url = new URL(`https://trigger.macrodroid.com/${deviceId}/${action}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, `${value}`);
  });
  return fetch(url.toString());
};
