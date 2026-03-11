const API_BASE = "http://localhost:8080/api/courses";

export type CourseStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  price: number;
  durationHours: number;
  status: CourseStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CourseInput {
  title: string;
  description: string;
  instructor: string;
  category: string;
  price: number;
  durationHours: number;
  status: CourseStatus;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: Record<string, string> | null;
}

export async function fetchCourses(params?: { status?: CourseStatus; category?: string }): Promise<Course[]> {
  const url = new URL(API_BASE);
  if (params?.status) url.searchParams.set("status", params.status);
  if (params?.category) url.searchParams.set("category", params.category);
  const res = await fetch(url.toString());
  const json: ApiResponse<Course[]> = await res.json();
  if (!json.success) throw new Error(json.message);
  console.log(json.data);
  return json.data;
}

export async function fetchCourse(id: string): Promise<Course> {
  const res = await fetch(`${API_BASE}/${id}`);
  const json: ApiResponse<Course> = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

export async function createCourse(input: CourseInput): Promise<Course> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const json: ApiResponse<Course> = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

export async function updateCourse(id: string, input: CourseInput): Promise<Course> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const json: ApiResponse<Course> = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

export async function updateCourseStatus(id: string, status: CourseStatus): Promise<Course> {
  const res = await fetch(`${API_BASE}/${id}/status?status=${status}`, {
    method: "PATCH",
  });
  const json: ApiResponse<Course> = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

export async function deleteCourse(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  const json: ApiResponse<null> = await res.json();
  if (!json.success) throw new Error(json.message);
}
