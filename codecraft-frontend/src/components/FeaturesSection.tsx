import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Filter, ToggleRight, Eye } from "lucide-react";

const features = [
  { icon: Plus, title: "Create Courses", desc: "Add new courses with full validation — title, description, pricing, and more." },
  { icon: Edit, title: "Update Anytime", desc: "Edit course details or update status with a single click." },
  { icon: Filter, title: "Smart Filtering", desc: "Filter by status (Draft, Published, Archived) or category instantly." },
  { icon: Eye, title: "Detailed View", desc: "View complete course info including duration, pricing, and timestamps." },
  { icon: ToggleRight, title: "Status Control", desc: "Toggle between Draft, Published, and Archived states seamlessly." },
  { icon: Trash2, title: "Clean Deletion", desc: "Remove courses with confirmation to prevent accidental data loss." },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Complete course management with a clean REST API backend and beautiful frontend.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-6 rounded-2xl bg-card shadow-card hover:shadow-card-hover border border-border transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feat.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">{feat.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
