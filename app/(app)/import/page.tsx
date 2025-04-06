"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import {
  Upload,
  CheckCircle,
  FileSpreadsheet,
  Globe,
  Loader2,
  MessageSquareText,
  Webhook,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { parseFile } from "@/lib/file-upload/csv-parser";
import {
  CSVRowData,
  TextInputFormValues,
  addTestimonialFromText,
  generateWebhookUrl,
  processCSVData,
  startGoogleOAuth,
} from "@/lib/actions/import-testimonials";
import { toast } from "sonner";

export default function ImportPage() {
  // State for direct text input form
  const [textInputForm, setTextInputForm] = useState<TextInputFormValues>({
    name: "",
    rating: 5,
    testimonial: "",
  });

  // State for file upload
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    success?: string;
    error?: string;
  } | null>(null);

  // State for webhook URL
  const [webhookUrl, setWebhookUrl] = useState<string>("");
  const [isGeneratingUrl, setIsGeneratingUrl] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // State for Google OAuth
  const [isConnecting, setIsConnecting] = useState(false);

  // Generate webhook URL on component mount
  useEffect(() => {
    const getWebhookUrl = async () => {
      setIsGeneratingUrl(true);
      try {
        const result = await generateWebhookUrl();
        if (result.success && result.webhookUrl) {
          setWebhookUrl(result.webhookUrl);
        } else if (result.error) {
          toast.error(result.error);
        }
      } catch (error) {
        toast.error("Failed to generate webhook URL");
      } finally {
        setIsGeneratingUrl(false);
      }
    };

    getWebhookUrl();
  }, []);

  // Handle direct text input form changes
  const handleTextInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTextInputForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle direct text input form submission
  const handleTextInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await addTestimonialFromText(textInputForm);

      if (result.success) {
        toast.success(result.success);
        // Reset form
        setTextInputForm({
          name: "",
          rating: 5,
          testimonial: "",
        });
      } else if (result.error) {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to add testimonial");
    }
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUploadResult(null); // Reset previous results
    }
  };

  // Handle file upload submission
  const handleFileUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    setIsUploading(true);
    setUploadResult(null);

    try {
      // Parse the file
      const parsedData = await parseFile(file);

      // Process the parsed data
      const result = await processCSVData(parsedData);

      if (result.success) {
        setUploadResult({ success: result.success });
        toast.success(result.success);
        setFile(null); // Reset file selection
      } else if (result.error) {
        setUploadResult({ error: result.error });
        toast.error(result.error);
      }
    } catch (error) {
      setUploadResult({ error: "Failed to process file" });
      toast.error("Failed to process file");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle copy webhook URL to clipboard
  const handleCopyWebhookUrl = useCallback(() => {
    if (webhookUrl) {
      navigator.clipboard
        .writeText(webhookUrl)
        .then(() => {
          setIsCopied(true);
          toast.success("Webhook URL copied to clipboard");

          // Reset copy state after 2 seconds
          setTimeout(() => {
            setIsCopied(false);
          }, 2000);
        })
        .catch(() => {
          toast.error("Failed to copy to clipboard");
        });
    }
  }, [webhookUrl]);

  // Handle Google OAuth connection
  const handleGoogleConnect = async () => {
    setIsConnecting(true);

    try {
      const result = await startGoogleOAuth();

      if (result.success) {
        toast.success("Successfully connected to Google");
      } else if (result.error) {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to connect to Google");
    } finally {
      setIsConnecting(false);
    }
  };

  const tabOptions = [
    {
      id: "google",
      label: "Google Reviews",
      icon: <Globe className="w-5 h-5" />,
    },
    {
      id: "csv",
      label: "CSV/Excel",
      icon: <FileSpreadsheet className="w-5 h-5" />,
    },
    {
      id: "text",
      label: "Text Input",
      icon: <MessageSquareText className="w-5 h-5" />,
    },
    {
      id: "webhooks",
      label: "Webhooks",
      icon: <Webhook className="w-5 h-5" />,
    },
  ];

  return (
    <div className="container max-w-5xl px-4 py-12 mx-auto">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Import Testimonials
        </h1>
        <p className="text-lg text-gray-600">
          Choose your preferred method to import testimonials
        </p>
      </div>

      <Tabs defaultValue="google" className="w-full">
        <TabsList className="w-full mb-6 flex justify-start border-b border-gray-200 p-0 bg-transparent h-auto rounded-none">
          {tabOptions.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={cn(
                "flex items-center py-3 px-4 text-sm font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none data-[state=active]:bg-transparent h-auto",
                "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <TabsContent value="google" className="mt-0 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Google Reviews API
            </h2>
            <p className="text-gray-600">
              Import reviews directly from your Google Business Profile using
              OAuth authentication.
            </p>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-700">
                You'll need to grant GlowMint permission to access your Google
                Business Profile reviews.
              </p>
            </div>
            <button
              onClick={handleGoogleConnect}
              disabled={isConnecting}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-70"
            >
              {isConnecting ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Globe className="w-5 h-5 mr-2" />
              )}
              {isConnecting ? "Connecting..." : "Connect Google Reviews"}
            </button>
          </TabsContent>

          <TabsContent value="csv" className="mt-0 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              CSV/Excel Upload
            </h2>
            <p className="text-gray-600">
              Import testimonials in bulk by uploading a CSV or Excel file.
            </p>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-700">
                Your file should include columns for name, rating, date, and
                testimonial text.
                <a href="#" className="underline ml-1">
                  Download template
                </a>
              </p>
            </div>

            <div className="flex items-center justify-center w-full">
              <label
                className={cn(
                  "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100",
                  file ? "border-blue-300" : "border-gray-300",
                  isUploading && "opacity-70 cursor-not-allowed"
                )}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {file ? (
                    <>
                      <FileSpreadsheet className="w-8 h-8 mb-3 text-blue-500" />
                      <p className="mb-2 text-sm text-gray-700 font-medium">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mb-3 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        CSV, XLS, or XLSX (max 10MB)
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".csv,.xls,.xlsx"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
              </label>
            </div>

            {file && (
              <div className="flex justify-center">
                <button
                  onClick={handleFileUpload}
                  disabled={isUploading || !file}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-70"
                >
                  {isUploading ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <Upload className="w-5 h-5 mr-2" />
                  )}
                  {isUploading ? "Processing..." : "Process File"}
                </button>
              </div>
            )}

            {uploadResult && (
              <div
                className={cn(
                  "p-4 rounded-lg border",
                  uploadResult.success
                    ? "bg-green-50 border-green-100 text-green-700"
                    : "bg-red-50 border-red-100 text-red-700"
                )}
              >
                <p className="text-sm font-medium">
                  {uploadResult.success || uploadResult.error}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="text" className="mt-0 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Direct Text Input
            </h2>
            <p className="text-gray-600">
              Manually enter or paste testimonials directly.
            </p>
            <form onSubmit={handleTextInputSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Customer Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={textInputForm.name}
                  onChange={handleTextInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="John Smith"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="rating"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Rating (1-5)
                </label>
                <select
                  id="rating"
                  name="rating"
                  value={textInputForm.rating}
                  onChange={handleTextInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} Stars
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="testimonial"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Testimonial Text
                </label>
                <textarea
                  id="testimonial"
                  name="testimonial"
                  value={textInputForm.testimonial}
                  onChange={handleTextInputChange}
                  rows={5}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Paste or type the customer testimonial here..."
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Testimonial
              </button>
            </form>
          </TabsContent>

          <TabsContent value="webhooks" className="mt-0 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Typeform/Zapier Webhooks
            </h2>
            <p className="text-gray-600">
              Set up automated testimonial collection via webhooks from your
              favorite tools.
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-700">
                  Configure your Typeform, Zapier, or other platforms to send
                  data to your unique webhook URL.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Your Webhook URL
                </label>
                <div className="flex">
                  <input
                    type="text"
                    readOnly
                    value={isGeneratingUrl ? "Generating URL..." : webhookUrl}
                    className="flex-1 p-2 border border-gray-300 rounded-l-lg bg-gray-50"
                  />
                  <button
                    onClick={handleCopyWebhookUrl}
                    disabled={isGeneratingUrl || !webhookUrl}
                    className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-r-lg hover:bg-gray-300 transition-colors flex items-center disabled:opacity-70"
                  >
                    {isCopied ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                        Copied
                      </>
                    ) : (
                      "Copy"
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-800">
                  Integration Guides:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Typeform", "Google Forms", "Zapier", "Make.com"].map(
                    (tool) => (
                      <a
                        key={tool}
                        href="#"
                        className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <span className="w-8 h-8 mr-3 bg-gray-200 rounded-md"></span>
                        <span>Connect with {tool}</span>
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
