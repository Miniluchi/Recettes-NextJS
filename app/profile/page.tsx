import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/lib/authOptions";
import { Calendar, Mail, User as UserIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Profil</CardTitle>
            <CardDescription>
              Vos informations personnelles
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Nom */}
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="p-2 bg-primary/10 rounded-full">
                <UserIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Nom</p>
                <p className="font-medium text-lg">
                  {user.name || "Non renseigné"}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="p-2 bg-primary/10 rounded-full">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-lg">{user.email}</p>
              </div>
              <Badge variant="secondary">Vérifié</Badge>
            </div>

            {/* Informations supplémentaires */}
            <div className="p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Informations du compte</p>
              </div>
              <p className="text-sm text-muted-foreground">
                ID utilisateur : <span className="font-mono">{user.id}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
