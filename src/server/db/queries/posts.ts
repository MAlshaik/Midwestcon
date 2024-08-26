import { db } from "~/server/db";
import { posts, users, comments, likes } from "~/server/db/schema";
import { eq, desc, count,sql} from "drizzle-orm";
import { createClient } from "~/utils/supabase/server";

export async function getPostById(postId: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [post] = await db
    .select({
      id: posts.id,
      title: posts.title,
      description: posts.description,
      content: posts.content,
      likes: posts.likes,
      thumbnailUrl: posts.thumbnailUrl,
      createdAt: posts.createdAt,
      userId: posts.userId,
      user: {
        id: users.id,
      },
      commentCount: count(comments.id),
      liked: user ? sql<boolean>`EXISTS (
        SELECT 1 FROM ${likes}
        WHERE ${likes.postId} = ${posts.id}
        AND ${likes.userId} = ${user.id}
      )`.as('liked') : sql<null>`NULL`.as('liked'),
    })
    .from(posts)
    .leftJoin(users, eq(posts.userId, users.id))
    .leftJoin(comments, eq(posts.id, comments.postId))
    .groupBy(posts.id, users.id)
    .where(eq(posts.id, postId));

  if (!post) return null;

  let userFullName = '';
  if (post.user) {
    const { data: userData } = await supabase.auth.admin.getUserById(post.user.id);
    userFullName = userData?.user?.user_metadata
      ? `${userData.user.user_metadata.firstName || ''} ${userData.user.user_metadata.lastName || ''}`.trim()
      : '';
  }
  
  return {
    ...post,
    liked: post.liked,
    user: post.user ? {
      ...post.user,
      fullName: userFullName
    } : null
  };
}

export async function getPostsWithUserInfo(limit: number = 10, offset: number = 0) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const postsWithCounts = await db
    .select({
      id: posts.id,
      title: posts.title,
      description: posts.description,
      content: posts.content,
      likes: posts.likes,
      thumbnailUrl: posts.thumbnailUrl,
      createdAt: posts.createdAt,
      userId: posts.userId,
      user: {
        id: users.id,
      },
      commentCount: count(comments.id),
      liked: user ? sql<boolean>`EXISTS (
        SELECT 1 FROM ${likes}
        WHERE ${likes.postId} = ${posts.id}
        AND ${likes.userId} = ${user.id}
      )`.as('liked') : sql<null>`NULL`.as('liked'),
    })
    .from(posts)
    .leftJoin(users, eq(posts.userId, users.id))
    .leftJoin(comments, eq(posts.id, comments.postId))
    .groupBy(posts.id, users.id)
    .orderBy(desc(posts.createdAt))
    .limit(limit)
    .offset(offset);

  // Fetch user metadata for all posts
  const userMetadata = await Promise.all(
    postsWithCounts.map(post => post.user ? supabase.auth.admin.getUserById(post.user.id) : null)
  );

  // Combine post data with user metadata
  return postsWithCounts.map((post, index) => ({
    ...post,
    liked: post.liked,
    user: post.user ? {
      ...post.user,
      fullName: userMetadata[index]?.data?.user?.user_metadata
        ? `${userMetadata[index]?.data?.user?.user_metadata.firstName || ''} ${userMetadata[index]?.data?.user?.user_metadata.lastName || ''}`.trim()
        : ''
    } : null
  }));
}

export async function getPostWithComments(postId: string) {
  const post = await getPostById(postId);
  
  if (!post) return null;

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const postComments = await db
    .select({
      id: comments.id,
      content: comments.content,
      createdAt: comments.createdAt,
      userId: comments.userId,
      user: {
        id: users.id,
      },
      liked: user ? sql<boolean>`EXISTS (
        SELECT 1 FROM ${likes}
        WHERE ${likes.postId} = ${comments.id}
        AND ${likes.userId} = ${user.id}
      )`.as('liked') : sql<null>`NULL`.as('liked'),
    })
    .from(comments)
    .leftJoin(users, eq(comments.userId, users.id))
    .where(eq(comments.postId, postId))
    .orderBy(desc(comments.createdAt));

  // Fetch user metadata for all comments
  const userMetadata = await Promise.all(
    postComments.map(comment => comment.user ? supabase.auth.admin.getUserById(comment.user.id) : null)
  );

  // Combine comment data with user metadata
  const commentsWithUserInfo = postComments.map((comment, index) => ({
    ...comment,
    liked: comment.liked,
    user: comment.user ? {
      ...comment.user,
      fullName: userMetadata[index]?.data?.user?.user_metadata
        ? `${userMetadata[index]?.data?.user?.user_metadata.firstName || ''} ${userMetadata[index]?.data?.user?.user_metadata.lastName || ''}`.trim()
        : ''
    } : null
  }));

  return { ...post, comments: commentsWithUserInfo };
}

export async function getTopPostsWithUserInfo(limit: number = 3) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const postsWithCounts = await db
    .select({
      id: posts.id,
      title: posts.title,
      description: posts.description,
      content: posts.content,
      likes: posts.likes,
      thumbnailUrl: posts.thumbnailUrl,
      createdAt: posts.createdAt,
      userId: posts.userId,
      user: {
        id: users.id,
      },
      commentCount: count(comments.id),
      liked: user ? sql<boolean>`EXISTS (
        SELECT 1 FROM ${likes}
        WHERE ${likes.postId} = ${posts.id}
        AND ${likes.userId} = ${user.id}
      )`.as('liked') : sql<null>`NULL`.as('liked'),
    })
    .from(posts)
    .leftJoin(users, eq(posts.userId, users.id))
    .leftJoin(comments, eq(posts.id, comments.postId))
    .groupBy(posts.id, users.id)
    .orderBy(desc(posts.likes)) // Changed to order by likes for "top" posts
    .limit(limit);

  // Fetch user metadata for all posts
  const userMetadata = await Promise.all(
    postsWithCounts.map(post => post.user ? supabase.auth.admin.getUserById(post.user.id) : null)
  );

  // Combine post data with user metadata
  return postsWithCounts.map((post, index) => ({
    ...post,
    liked: post.liked,
    user: post.user ? {
      ...post.user,
      fullName: userMetadata[index]?.data?.user?.user_metadata
        ? `${userMetadata[index]?.data?.user?.user_metadata.firstName || ''} ${userMetadata[index]?.data?.user?.user_metadata.lastName || ''}`.trim()
        : ''
    } : null
  }));
}
