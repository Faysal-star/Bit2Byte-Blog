const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const revalidationTime = 10;

export async function getAllBlogs() {
  try {
    const result: any = await fetch(`${BASE_URL}/read_blogs`, {
      // cache: "no-store",
      next: {
        revalidate: revalidationTime,
      },
    });
    if (!result.ok) {
      throw new Error("Error occured while fetching");
    }
    return result.json();
  } catch (error) {
    console.error("Error in getAllBlogs:", error);
    throw error;
  }
}

export async function getSingleBlog(id: string) {
  const result: any = await fetch(`${BASE_URL}/read_blog_details/${id}`, {
    //   cache: "no-store",
    next: {
      revalidate: revalidationTime,
    },
  });
  console.log(result);
  if (!result.ok) {
    throw new Error("Error occured while fetching" );
  }
  return result.json();
}

export async function getSyllabus() {
  try {
    const result: any = await fetch(`${BASE_URL}/read_syllabus`, {
      //   cache: "no-store",
      next: {
        revalidate: revalidationTime,
      },
    });
    if (!result.ok) {
      throw new Error("Error occured while fetching");
    }
    return result.json();
  } catch (error) {
    console.error("Error in getSyllabus:", error);
    throw error;
    
  }
}

export async function getFilteredBlog(topic: string, subtopic: string | null) {
  let url = `${BASE_URL}/filter_by?topic=${topic}` + (subtopic ? `&subtopic=${subtopic}` : "");
  
  const result: any = await fetch(url, {
    //   cache: "no-store",
    next: {
      revalidate: revalidationTime,
    },
  });
  if (!result.ok) {
    throw "Error occured while fetching";
  }
  return result.json();
}

export async function getRedirectName(link_name: string) {
  try {
    const url = `${BASE_URL}/read_link?link_name=${link_name}`;
    const result = await fetch(url, {
      next: {
        revalidate: revalidationTime,
      },
    });

    if (!result.ok) {
      throw Error(
        `API responded with status: ${result.status} ${result.statusText}`
      );
    }

    // Ensure the response is valid JSON
    const text = await result.text(); // Read response as text
    if (!text) {
      throw Error("API response is empty");
    }

    return JSON.parse(text); // Parse to JSON
  } catch (error) {
    console.error("Error in getRedirectName:", error);
    throw error;
  }
}
