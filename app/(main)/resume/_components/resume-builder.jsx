"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Download,
  Edit,
  Loader2,
  Monitor,
  Save,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { saveResume } from "@/actions/resume";
import { EntryForm } from "./entry-form";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";
import html2pdf from "html2pdf.js/dist/html2pdf.min.js";

export default function ResumeBuilder({ initialContent }) {
  const [activeTab, setActiveTab] = useState("edit");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const { user } = useUser();
  const [resumeMode, setResumeMode] = useState("preview");

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  // Watch form fields for preview updates
  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  // Update preview content when form values change
  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);

  // Handle save result
  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!");
    }
    if (saveError) {
      toast.error(saveError.message || "Failed to save resume");
    }
  }, [saveResult, saveError, isSaving]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center">${user.fullName}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("resume-pdf");
      const opt = {
        margin: [15, 15],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formattedContent = previewContent
        .replace(/\n/g, "\n") // Normalize newlines
        .replace(/\n\s*\n/g, "\n\n") // Normalize multiple newlines to double newlines
        .trim();

      console.log(previewContent, formattedContent);
      await saveResumeFn(previewContent);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div data-color-mode="light" className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-500/20 to-pink-500/20">
            <FileText className="h-8 w-8 text-violet-500" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Resume <span className="text-gradient">Builder</span>
            </h1>
            <p className="text-muted-foreground mt-1">Create your professional resume</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleSubmit(onSubmit)}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save
              </>
            )}
          </Button>
          <Button onClick={generatePDF} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="edit">
            <Edit className="h-4 w-4 mr-2" />
            Form
          </TabsTrigger>
          <TabsTrigger value="preview">
            <Monitor className="h-4 w-4 mr-2" />
            Markdown
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-violet-500/10">
                    <User className="h-5 w-5 text-violet-500" />
                  </div>
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      {...register("contactInfo.email")}
                      type="email"
                      placeholder="your@email.com"
                      error={errors.contactInfo?.email}
                    />
                    {errors.contactInfo?.email && (
                      <p className="text-sm text-red-500">
                        {errors.contactInfo.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Mobile Number</label>
                    <Input
                      {...register("contactInfo.mobile")}
                      type="tel"
                      placeholder="+1 234 567 8900"
                    />
                    {errors.contactInfo?.mobile && (
                      <p className="text-sm text-red-500">
                        {errors.contactInfo.mobile.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">LinkedIn URL</label>
                    <Input
                      {...register("contactInfo.linkedin")}
                      type="url"
                      placeholder="https://linkedin.com/in/your-profile"
                    />
                    {errors.contactInfo?.linkedin && (
                      <p className="text-sm text-red-500">
                        {errors.contactInfo.linkedin.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Twitter/X Profile
                    </label>
                    <Input
                      {...register("contactInfo.twitter")}
                      type="url"
                      placeholder="https://twitter.com/your-handle"
                    />
                    {errors.contactInfo?.twitter && (
                      <p className="text-sm text-red-500">
                        {errors.contactInfo.twitter.message}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/10">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                  </div>
                  Professional Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Controller
                  name="summary"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      className="h-32"
                      placeholder="Write a compelling professional summary..."
                      error={errors.summary}
                    />
                  )}
                />
                {errors.summary && (
                  <p className="text-sm text-red-500 mt-2">{errors.summary.message}</p>
                )}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-pink-500/10">
                    <Code className="h-5 w-5 text-pink-500" />
                  </div>
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Controller
                  name="skills"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      className="h-32"
                      placeholder="List your key skills..."
                      error={errors.skills}
                    />
                  )}
                />
                {errors.skills && (
                  <p className="text-sm text-red-500 mt-2">{errors.skills.message}</p>
                )}
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-violet-500/10">
                    <Briefcase className="h-5 w-5 text-violet-500" />
                  </div>
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Controller
                  name="experience"
                  control={control}
                  render={({ field }) => (
                    <EntryForm
                      type="Experience"
                      entries={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.experience && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.experience.message}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/10">
                    <GraduationCap className="h-5 w-5 text-purple-500" />
                  </div>
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Controller
                  name="education"
                  control={control}
                  render={({ field }) => (
                    <EntryForm
                      type="Education"
                      entries={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.education && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.education.message}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-pink-500/10">
                    <Code className="h-5 w-5 text-pink-500" />
                  </div>
                  Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Controller
                  name="projects"
                  control={control}
                  render={({ field }) => (
                    <EntryForm
                      type="Project"
                      entries={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.projects && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.projects.message}
                  </p>
                )}
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="preview">
          {activeTab === "preview" && (
            <Button
              variant="outline"
              type="button"
              className="mb-4"
              onClick={() =>
                setResumeMode(resumeMode === "preview" ? "edit" : "preview")
              }
            >
              {resumeMode === "preview" ? (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Resume
                </>
              ) : (
                <>
                  <Monitor className="h-4 w-4 mr-2" />
                  Show Preview
                </>
              )}
            </Button>
          )}

          {activeTab === "preview" && resumeMode !== "preview" && (
            <Card className="mb-4 border-amber-500/50 bg-amber-500/10">
              <CardContent className="flex items-center gap-3 py-4">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <span className="text-sm text-amber-600 dark:text-amber-400">
                  You will lose edited markdown if you update the form data.
                </span>
              </CardContent>
            </Card>
          )}
          <Card className="overflow-hidden">
            <MDEditor
              value={previewContent}
              onChange={setPreviewContent}
              height={800}
              preview={resumeMode}
            />
          </Card>
          <div className="hidden">
            <div id="resume-pdf">
              <MDEditor.Markdown
                source={previewContent}
                style={{
                  background: "white",
                  color: "black",
                }}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
