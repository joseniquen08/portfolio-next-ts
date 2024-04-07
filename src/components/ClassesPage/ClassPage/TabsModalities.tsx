import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Roadmap } from "./Roadmap";
import { TechnologyType } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";

export function TabsModalities({ tech }: { tech: TechnologyType }) {
  return (
    <div className="flex flex-col gap-5 mt-8">
      <Tabs defaultValue="basic-roadmap" className="max-w-4xl mx-auto w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
          <TabsTrigger value="basic-roadmap">R. A. Básica</TabsTrigger>
          <TabsTrigger value="custom-roadmap">R. A. Personalizada</TabsTrigger>
          <TabsTrigger value="custom-sessions">
            Sesiones Personalizadas
          </TabsTrigger>
        </TabsList>
        <Card className="mt-2 bg-custom-light-bg dark:bg-custom-dark-bg dark:border-custom-dark-text/20">
          <ScrollArea className="h-120">
            <CardContent className="p-4">
              <TabsContent value="basic-roadmap" className="mt-0">
                <Roadmap tech={tech} />
              </TabsContent>
              <TabsContent value="custom-roadmap" className="mt-0 space-y-3">
                <p className="max-w-[80ch] text-sm">
                  Comunícate conmigo para revisar los materiales y organizar los
                  temas para cada sesión.
                </p>
                <Button type="submit" variant="destructive" className="">
                  <FaWhatsapp className="flex-none mr-1.5" size={20} /> WhatsApp
                </Button>
              </TabsContent>
              <TabsContent value="custom-sessions" className="mt-0">
                Prueba 3
              </TabsContent>
            </CardContent>
          </ScrollArea>
        </Card>
      </Tabs>
    </div>
  );
}
