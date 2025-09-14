import { LoginInputSchema } from "@/schema/auth";
import { User } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

//register user
export interface SignUpParams {
  email: string;
  password: string;
  name: string;
  photo: File;
}

export interface LoginResponse {
  data: User | null;
  message: string;
  success: boolean;
}

export async function signUpUser(
  formData: FormData
): Promise<LoginResponse> {
  try {
    const info = formData.get('info');
    const photo = formData.get('photo');
    const formDataToSend = new FormData();
    
    // Add the info as a JSON blob with proper content type
    if (info) {
      const infoBlob = new Blob([info as string], { 
        type: 'application/json' 
      });
      formDataToSend.append('info', infoBlob);
    }
    
    if (photo) {
      formDataToSend.append('photo', photo);
    }
    
    const response = await fetch(`${BASE_URL}/sign_up`, {
      method: "POST",
      credentials: "include",
      body: formDataToSend,
    });

    const responseData: LoginResponse = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    console.log("signUpUser", responseData);
    return responseData;

  } catch (error) {
    console.error("SignUp error:", error);
    
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred during registration.");
    }
  }
}

// login user

export interface LoginParams {
  email: string;
  password: string;
}

export async function loginUser(params: LoginParams): Promise<LoginResponse> {
  const { email, password } = params;

  try {
    const validatedInput = LoginInputSchema.parse({ email, password });

    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(validatedInput),
    });

    const responseData: LoginResponse = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return responseData;

  } catch (error) {
    console.error("Login error:", error);
    
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred during login.");
    }
  }
}

export async function logoutUser(): Promise<{ message: string; success: boolean }> {
  try {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    
    const responseData: { message: string; success: boolean } = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    return responseData;
  } catch (error) {
    console.error("Logout error:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred during logout.");
    }
  }
}
// Blog management
export async function deleteBlog(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/delete_blog?blog_id=${id}`, {
      method: 'POST',
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
}

export async function saveBlogInfo(blogInfo: any, image: File | null) {
  try {
    const formData = new FormData();
    formData.append('blog_info', JSON.stringify(blogInfo));
    if (image) {
      formData.append('image', image);
    }
    
    const response = await fetch(`${BASE_URL}/save_blog_info`, {
      method: 'POST',
      body: formData
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error saving blog info:', error);
    throw error;
  }
}

export async function saveBlogDetails(id: number, content: string) {
  try {
    const response = await fetch(`${BASE_URL}/save_blog_details`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        content
      })
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error saving blog details:', error);
    throw error;
  }
}

// Category (Topic) management
export async function saveTopic(topicData: any) {
  try {
    const response = await fetch(`${BASE_URL}/save_topic`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(topicData)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error saving topic:', error);
    throw error;
  }
}

export async function updateTopic(topicData: any) {
  try {
    const response = await fetch(`${BASE_URL}/update_topic`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(topicData)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error updating topic:', error);
    throw error;
  }
}

export async function deleteTopic(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/delete_topic?topic_id=${id}`, {
      method: 'POST'
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting topic:', error);
    throw error;
  }
}

// Subtopic management
export async function saveSubtopic(subtopicData: any) {
  try {
    const response = await fetch(`${BASE_URL}/save_sub_topic`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subtopicData)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error saving subtopic:', error);
    throw error;
  }
}

export async function updateSubtopic(subtopicData: any) {
  try {
    const response = await fetch(`${BASE_URL}/update_sub_topic`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subtopicData)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error updating subtopic:', error);
    throw error;
  }
}

export async function deleteSubtopic(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/delete_sub_topic?sub_topic_id=${id}`, {
      method: 'POST'
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting subtopic:', error);
    throw error;
  }
}
