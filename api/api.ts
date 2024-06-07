import instance from "@/lib/axios";

export async function getTotalPosts({ pageSize = 10000 }) {
  try {
    const { data } = await instance.get(
      `/articles?&pageSize=${pageSize}&orderBy=like`,
    );
    return data.list;
  } catch (error) {
    console.error("getTotalPosts 함수에서 오류 발생:", error);
    throw error;
  }
}

export async function getPosts({
  orderBy = "",
  keyword = "",
  page = 1,
  pageSize = 10,
}) {
  try {
    const params = new URLSearchParams({
      orderBy,
      keyword,
      page: page.toString(),
      pageSize: pageSize.toString(),
    });
    const { data } = await instance.get(`/articles?${params.toString()}`);
    return data.list;
  } catch (error) {
    console.error("getPosts 함수에서 오류 발생:", error);
    throw error;
  }
}

export async function getBestPosts({ pageSize = 3 }) {
  try {
    const { data } = await instance.get(
      `/articles?&pageSize=${pageSize}&orderBy=like`,
    );
    return data.list;
  } catch (error) {
    console.error("getBestPosts 함수에서 오류 발생:", error);
    throw error;
  }
}

export async function getPostsDetail(articleId: string) {
  try {
    const { data } = await instance.get(`/articles/${articleId}`);
    return data;
  } catch (error) {
    console.error("getPostsDetail 함수에서 오류 발생:", error);
    throw error;
  }
}

export async function getPostsComments(articleId: string) {
  try {
    const { data } = await instance.get(
      `/articles/${articleId}/comments?limit=100`,
    );
    return data.list;
  } catch (error) {
    console.error("getPostsComments 함수에서 오류 발생:", error);
    throw error;
  }
}
