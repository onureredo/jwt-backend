import { Router } from 'express';
import {
  getAllPosts,
  getSinglePost,
  createPost,
  deletePost,
  updatePost,
} from '../controllers/posts.js';
import verifyToken from '../middlewares/verifyToken.js';

const postsRouter = Router();

postsRouter.route('/').get(getAllPosts).post(verifyToken, createPost);
postsRouter
  .route('/:id')
  .get(getSinglePost)
  .put(verifyToken, updatePost)
  .delete(verifyToken, deletePost);

export default postsRouter;
