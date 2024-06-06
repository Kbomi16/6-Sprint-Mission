import instance from "@/lib/axios";

export async function getPosts({ orderBy = "", keyword = "" }) {
  const params = new URLSearchParams({ orderBy, keyword });
  const { data } = await instance.get(
    `/articles?page=1&pageSize=100&${params.toString()}`,
  );
  return data.list;
}

export async function getBestPosts({ pageSize = 3 }) {
  const { data } = await instance.get(
    `/articles?&pageSize=${pageSize}&orderBy=like`,
  );
  return data.list;
}

export async function getPostsDetail(articleId: string) {
  const { data } = await instance.get(`/articles/${articleId}`);
  return data;
}

export async function getPostsComments(articleId: string) {
  const { data } = await instance.get(
    `/articles/${articleId}/comments?limit=100`,
  );
  return data.list;
}
