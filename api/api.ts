import instance from "@/lib/axios";

export async function getTotalPosts({ pageSize = 10000 }) {
  const { data } = await instance.get(
    `/articles?&pageSize=${pageSize}&orderBy=like`,
  );
  return data.list;
}

export async function getPosts({
  orderBy = "",
  keyword = "",
  page = 1,
  pageSize = 10,
}) {
  const params = new URLSearchParams({
    orderBy,
    keyword,
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
  const { data } = await instance.get(`/articles?${params.toString()}`);
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
