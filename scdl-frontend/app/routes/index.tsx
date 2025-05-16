// app/routes/index.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Loader2 } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  // 1. Define schema
  const formSchema = z.object({
    url: z
      .string()
      .url({ message: "Please enter a valid URL." })
      .refine(
        (val) => {
          try {
            const url = new URL(val);
            return (
              url.hostname === "soundcloud.com" ||
              url.hostname.endsWith(".soundcloud.com")
            );
          } catch {
            return false;
          }
        },
        { message: "URL must be a SoundCloud link." }
      ),
  });

  // 2. Setup form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { url: "" },
  });

  // 3. Handle submit
  function onSubmit(values) {
    // Do something with the valid SoundCloud URL
    // e.g., trigger download
    console.log(values);
  }

  return (
    <div className="h-screen w-screen p-6">
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-black">
          {/* Image Overlay */}
          <img
            src="/background-2.webp"
            alt="logo"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute opacity-10 top-0 left-0 z-10 w-[200%] h-[200%] object-fill bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-center bg-repeat [animation:animateGrain_10s_steps(10)_infinite]" />
        </div>
        <div className="absolute z-30 top-0 left-0 w-full h-full flex flex-col items-center gap-8 justify-center text-white">
          <div>
            <h1 className="text-[64px] font-serif leading-none">
              Download straight from <span className="italic">Soundcloud</span>
            </h1>
            <p className="text-xl font-thin text-center">
              No hassle, free of charge
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="w-[600px]">
                    <FormLabel className="sr-only">SoundCloud URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://soundcloud.com/..."
                        className="rounded-full w-full text-white text-3xl px-5 py-6 placeholder:text-white/60"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="outline"
                className="bg-transparent h-[50px] aspect-square rounded-full disabled:bg-white/40"
                disabled={form.formState.isSubmitting}
              >
                {/* <Loader2 className="animate-spin hidden" /> */}
                <Download />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
