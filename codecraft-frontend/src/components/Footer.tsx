import { BookOpen } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card py-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-display font-bold text-foreground">CourseHub</span>
      </div>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} CourseHub. Built with Spring Boot & React.
      </p>
    </div>
  </footer>
);

export default Footer;
