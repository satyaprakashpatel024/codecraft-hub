import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Filter } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import CourseFormDialog from "@/components/CourseFormDialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { fetchCourses, createCourse, updateCourse, deleteCourse } from "@/lib/api";
import type { Course, CourseInput, CourseStatus } from "@/lib/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Courses = () => {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<CourseStatus | "ALL">("ALL");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: courses = [], isLoading, error } = useQuery({
    queryKey: ["courses", statusFilter, categoryFilter],
    queryFn: () =>
      fetchCourses({
        status: statusFilter === "ALL" ? undefined : statusFilter,
        category: categoryFilter || undefined,
      }),
  });

  const createMutation = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course created!");
      setDialogOpen(false);
    },
    onError: (e) => toast.error(e.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CourseInput }) => updateCourse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course updated!");
      setDialogOpen(false);
      setEditingCourse(null);
    },
    onError: (e) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course deleted!");
      setDeleteId(null);
    },
    onError: (e) => toast.error(e.message),
  });

  const handleSubmit = (data: CourseInput) => {
    if (editingCourse) {
      updateMutation.mutate({ id: editingCourse.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">Courses</h1>
              <p className="text-muted-foreground mt-1">Manage your course catalog</p>
            </div>
            <Button
              onClick={() => { setEditingCourse(null); setDialogOpen(true); }}
              className="gradient-hero text-primary-foreground font-semibold rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" /> New Course
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-8 p-4 rounded-xl bg-card border border-border">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as CourseStatus | "ALL")}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Filter by category..."
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-48"
            />
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-destructive font-medium mb-2">Failed to load courses</p>
              <p className="text-muted-foreground text-sm">Make sure your backend is running on localhost:8080</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No courses found</p>
              <p className="text-muted-foreground text-sm mt-1">Create your first course to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} onEdit={handleEdit} onDelete={setDeleteId} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      <CourseFormDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditingCourse(null); }}
        onSubmit={handleSubmit}
        course={editingCourse}
        loading={createMutation.isPending || updateMutation.isPending}
      />

      <AlertDialog open={!!deleteId} onOpenChange={(v) => !v && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Course?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Courses;
