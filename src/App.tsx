import { Refine } from "@refinedev/core";
import { BrowserRouter, Route, Routes } from "react-router";
import { useNotificationProvider } from "@/components/refine-ui/notification/use-notification-provider";
import { Toaster } from "@/components/refine-ui/notification/toaster";
import { dataProvider } from "@/providers/data";
import PortfolioPage from "@/pages/portfolio";
import BlogPage from "@/pages/blog";
import BlogPostPage from "@/pages/blog/post";
import { RefineAiErrorComponent } from "@/components/catch-all";

export default function App() {
  const notificationProvider = useNotificationProvider();

  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        notificationProvider={notificationProvider}
        options={{ syncWithLocation: true, warnWhenUnsavedChanges: true }}>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<RefineAiErrorComponent />} />
        </Routes>
        <Toaster />
      </Refine>
    </BrowserRouter>
  );
}
