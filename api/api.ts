import instance from "@/lib/axios";

export async function getPosts({ orderBy = "", keyword = "" }) {
  const params = new URLSearchParams({ orderBy, keyword });
  const response = await instance.get(`/articles?${params.toString()}`);
  return response.data.list;
}

export async function getBestPosts({ pageSize = 3 }) {
  const response = await instance.get(
    `/articles?&pageSize=${pageSize}&orderBy=like`,
  );
  return response.data.list;
}
