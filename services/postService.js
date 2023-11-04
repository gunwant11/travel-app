import { API, Storage } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
 

const apiName = 'travelapis'

export async function createPost(title, description, image, latitude, longitude, address, content, descHTML){
  const postId = uuidv4();
  const postData = {
    postId: postId,
    title,
    description,
    image,
    latitude,
    longitude,
    address,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    content,
    descHTML
  }
  try {
    res = await API.post('travelapis', '/posts', {body: postData});
    console.log('res',res);
  } catch (error) {
    console.log('error', error.message);
  }
   
    // return res;
}

export async function getPosts(){
  return API.get('posts', '/posts');
}

export async function getPost(postId){
  return API.get('posts', `/posts/${postId}`);
}

export async function updatePost(postId, title, description, image, latitude, longitude, address, content, descHTML){
  const postData = {
    postId: postId,
    title,
    description,
    image: imageKey,
    latitude,
    longitude,
    address,
    createdAt,
    updatedAt: Date.now(),
    content,
    descHTML
  }
  return API.put('posts', `/posts/${postId}`, {body: postData});
}


export async function deletePost(postId){
  return API.del('posts', `/posts/${postId}`);
}

