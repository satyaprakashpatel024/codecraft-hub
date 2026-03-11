import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { Course, CourseInput, CourseStatus } from "@/lib/api";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CourseInput) => void;
  course?: Course | null;
  loading?: boolean;
}

const defaultForm: CourseInput = {
  title: "",
  description: "",
  instructor: "",
  category: "",
  price: 0,
  durationHours: 1,
  status: "DRAFT",
};

const CourseFormDialog = ({ open, onClose, onSubmit, course, loading }: Props) => {
  const [form, setForm] = useState<CourseInput>(defaultForm);

  useEffect(() => {
    if (course) {
      setForm({
        title: course.title,
        description: course.description,
        instructor: course.instructor,
        category: course.category,
        price: course.price,
        durationHours: course.durationHours,
        status: course.status,
      });
    } else {
      setForm(defaultForm);
    }
  }, [course, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {course ? "Edit Course" : "Create New Course"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required minLength={3} maxLength={200} />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required minLength={10} maxLength={2000} rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="instructor">Instructor</Label>
              <Input id="instructor" value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input id="price" type="number" min={0} step={0.01} value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} />
            </div>
            <div>
              <Label htmlFor="duration">Hours</Label>
              <Input id="duration" type="number" min={1} max={1000} value={form.durationHours} onChange={(e) => setForm({ ...form, durationHours: parseInt(e.target.value) || 1 })} />
            </div>
            <div>
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as CourseStatus })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading} className="gradient-hero text-primary-foreground">
              {loading ? "Saving..." : course ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseFormDialog;
