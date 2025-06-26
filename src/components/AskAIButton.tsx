"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Fragment, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { ArrowUpIcon } from "lucide-react";
import { askAIAboutNotesAction } from "@/actions/notes";
import "@/styles/ai-response.css";

type Props = {
  user: User | null;
};

function AskAIButton({ user }: Props) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleOnOpenChange = (isOpen: boolean) => {
    if (!user) {
      router.push("/login");
    } else {
      if (isOpen) {
        setQuestionText("");
        setQuestions([]);
        setResponses([]);
      }
      setOpen(isOpen);
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleClickInput = () => {
    textareaRef.current?.focus();
  };

  const handleSubmit = () => {
    if (!questionText.trim()) return;

    const newQuestions = [...questions, questionText];
    setQuestions(newQuestions);
    setQuestionText("");
    setTimeout(scrollToBottom, 100);

    startTransition(async () => {
      const response = await askAIAboutNotesAction(newQuestions, responses);
      setResponses((prev) => [...prev, response]);
      setTimeout(scrollToBottom, 100);
    });
  };

  const scrollToBottom = () => {
    contentRef.current?.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary">Ask AI</Button>
      </DialogTrigger>
     <DialogContent
        className="custom-scrollbar flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden left-[35%] top-[5%]"
        style={{ position: "fixed" }}
        ref={contentRef}
        >

        <DialogHeader>
          <DialogTitle>Ask AI About Your Notes</DialogTitle>
          <DialogDescription>
            Our AI can answer questions about all of your notes
          </DialogDescription>
        </DialogHeader>

            <div className="flex flex-col gap-8 overflow-y-auto px-1 pr-2 pt-4" style={{ maxHeight: "60vh" }} ref={contentRef}>
            {questions.map((question, index) => (
                <Fragment key={index}>
                <p className="bg-muted text-muted-foreground ml-auto max-w-[60%] rounded-md px-2 py-1 text-sm">
                    {question}
                </p>
                {responses[index] && (
                    <p
                    className="bot-response text-muted-foreground text-sm"
                    dangerouslySetInnerHTML={{ __html: responses[index] }}
                    />
                )}
                </Fragment>
            ))}
            {isPending && <p className="animate-pulse text-sm">Thinking...</p>}
            </div>


        <div className="mt-auto border-t pt-4 flex justify-center">
  <div className="w-full max-w-2xl flex items-end gap-2">
    <Textarea
      ref={textareaRef}
      placeholder="Ask me anything about your notes..."
      className="placeholder:text-muted-foreground resize-none flex-1 border border-input bg-background p-2 rounded-md shadow-sm focus-visible:ring-1 focus-visible:ring-ring"
      style={{
        minHeight: "2.5rem",
        maxHeight: "10rem",
        overflow: "auto",
      }}
      rows={1}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      value={questionText}
      onChange={(e) => setQuestionText(e.target.value)}
    />
    <Button
      className="size-10 p-0 rounded-full"
      onClick={handleSubmit}
      type="button"
    >
      <ArrowUpIcon className="h-5 w-5 text-background" />
    </Button>
  </div>
</div>

      </DialogContent>
    </Dialog>
  );
}

export default AskAIButton;
