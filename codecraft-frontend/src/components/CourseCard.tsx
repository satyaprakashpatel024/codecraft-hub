import { motion } from "framer-motion";
import { Clock, DollarSign, Edit, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/lib/api";

interface Props {
  course: Course;
  onEdit: (c: Course) => void;
  onDelete: (id: string) => void;
  index: number;
}

const statusStyles: Record<string, string> = {
  DRAFT: "bg-muted text-muted-foreground",
  PUBLISHED: "bg-success text-success-foreground",
  ARCHIVED: "bg-warning text-warning-foreground",
};

const CourseCard = ({ course, onEdit, onDelete, index }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group p-5 rounded-2xl bg-card shadow-card hover:shadow-card-hover border border-border transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <Badge className={`${statusStyles[course.status]} text-xs font-semibold`}>
          {course.status}
        </Badge>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(course)}>
            <Edit className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onDelete(course.id)}>
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <h3 className="font-display font-semibold text-card-foreground text-lg mb-1.5 line-clamp-2">{course.title}</h3>
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{course.description}</p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{course.instructor}</span>
        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.durationHours}h</span>
        <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />${course.price}</span>
      </div>
    </motion.div>
  );
};

export default CourseCard;
