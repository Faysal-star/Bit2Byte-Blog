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