import BgGradient from "@/components/common/bg-gradient";
import { SummaryCard } from "@/components/summaries/summary-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const uploadLimit = 5;
  const summaries = [
    {
      id: 1,
      title: "Ai Powered Task Manager",
      created_at: "2025-03-25 16:39:56.67777+00",
      summary_text:
        "# 🤖 AI Powered Task Manager: Taking Productivity to the Next Level •🎯 Revolutionize task management with smart AI features and a user-friendly interface.# Document Details •🗃️ Type: Project Proposal•👯 For: Developers and Project Managers# Key Highlights•🚀 AI-powered enhancements like task summaries and smart deadlines•⭐ Standard task manager features like projects, boards, and team collaboration•💫 Freemium model for monetization # Why it matters •💡 By integrating AI with task management, we can boost productivity, streamline workflow, and offer a seamless user experience. This could revolutionize the way teams work and collaborate.# Main Points •🎯 AI features like task auto-delegation and voice-to-task conversion•💪 Robust tech stack for scalability and speed, including Next.js, Node.js, PostgreSQL, OpenAI, and Stripe•🔥 Four-phase development plan from setup to subscription system # Pro Tips •⭐ Start with the basic task manager features before integrating the AI components•💎 Use a freemium model to attract users and generate revenue•🌟 Pay attention to UI/UX design for an engaging user experience# Key Terms to Know•📚 CRUD: Create, Read, Update, Delete - basic functions of a database•🔍 Freemium Model: Basic features are free, advanced features require payment# Bottom Line•💫 The integration of AI into task management could be a game-changer in increasing productivity and enhancing team collaboration.",
      status: "completed",
    },
  ];
  return (
    <main className="min-h-screen">
      <BgGradient className="from-emarald-200 via-teal-200 to-cyan-200" />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex gap-4 mb-8 justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent">
                Your Summaries
              </h1>
              <p className="text-gray-600">
                Transform your PDFs into concise, actionable insights
              </p>
            </div>
            <Button
              variant="link"
              className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 Transition-all duration-300 group hover:no-underline"
            >
              <Link href="upload" className="flex text-white items-center">
                <Plus className="w-5 h-5 mr-2" /> New Summary
              </Link>
            </Button>
          </div>
          <div className="mb-6">
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800">
              <p className="text-sm">
                You have reached the limit of {uploadLimit} uploads on the basic
                plan.{" "}
                <Link
                  href="/#pricing"
                  className="text-rose-800 underline font-medium underline-offset-4 inline-flex items-center"
                >
                  Click here to upgrade to Pro{" "}
                  <ArrowRight className="w-4 h-4 inline-block" />
                </Link>{" "}
                for unlimited uploads.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
            {summaries.map((summary, index) => (
              <SummaryCard key={index} summary={summary} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
