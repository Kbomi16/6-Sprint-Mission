import instance from "@/lib/axios";

export async function getPosts({ orderBy = "", keyword = "" }) {
  const params = new URLSearchParams({ orderBy, keyword });
  const { data } = await instance.get(`/articles?${params.toString()}`);
  return data.list;
}

export async function getBestPosts({ pageSize = 3 }) {
  const { data } = await instance.get(
    `/articles?&pageSize=${pageSize}&orderBy=like`,
  );
  return data.list;
}
