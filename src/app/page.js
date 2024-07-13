import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import imgJpeg from "../../public/assets/imagem5.jpg";
import { Button } from "@/components/ui/button";

async function getData() {
  const data = await fetch(
    "https://newsapi.org/v2/top-headlines?country=br&category=business&apiKey=d9dfcd3cb4b64071aa795a60cdf1a4f4"
  );

  const json = await data.json();
  return json.articles;
}

export default async function Home() {
  const noticias = await getData();

  return (
    <div className=" w-full min-h-screen flex flex-col items-center justify-center bg-slate-300">
      {noticias.map((noticia) => (
        <Card
          className="py-4 m-16 border-none shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-slate-200"
          key={noticia.publishedAt}
        >
          <CardHeader className="flex flex-col">
            <CardTitle className="my-5 text-4xl font-bold text-slate-900">
              {noticia.title}
            </CardTitle>
            <CardDescription className=" text-2xl font-semibold text-slate-700">
              Divulgado por : {noticia.author}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-3">
            <Image src={imgJpeg} priority /> Data de publicação :{" "}
            {noticia.publishedAt.slice(0, 10)}
          </CardContent>
          <CardFooter>
            <Button className="bg-red-800 text-2xl w-96 h-14">
              <a href={noticia.url}>Leia a matéria completa</a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
