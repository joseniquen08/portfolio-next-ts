export default async function fetcher(input: string, init: any) {
  const res = await fetch(input, init);
  return res.json();
}
