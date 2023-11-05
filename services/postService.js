import { API, Storage } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
 

const apiName = 'travelapis'
// working
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
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
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
// working
export async function getPosts(){
  res = await  API.get(apiName, '/posts');
  console.log('res',res);
}

export async function getPost(postId){
  return API.get('posts', `/posts/${postId}`);
}

// working
export async function updatePost(postId, title, description, image, latitude, longitude, address, content, descHTML, createdAt){
  const postData = {
    postId: postId,
    title,
    description,
    image,
    latitude,
    longitude,
    address,
    createdAt,
    updatedAt: Date.now().toString(),
    content,
    descHTML
  }
  return API.put(apiName, `/posts`, {body: postData});
}


export async function deletePost(postId,createdAt){

  payload = { 
    postId,
    createdAt
  }
  res = await API.del(apiName, `/posts}`, {body: payload});
  console.log(res)
}

