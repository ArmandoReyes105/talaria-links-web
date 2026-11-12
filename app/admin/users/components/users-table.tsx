import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AdminUser } from "@/types/admin.types"

const dateFormatter = new Intl.DateTimeFormat("es", {
  day: "numeric",
  month: "short",
  year: "numeric",
})

interface UsersTableProps {
  users: AdminUser[]
  currentUserId: string
  updatingId: string | null
  onToggleRole: (user: AdminUser) => void
}

const UsersTable = ({
  users,
  currentUserId,
  updatingId,
  onToggleRole,
}: UsersTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-170 border-collapse text-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th scope="col" className="px-2 py-2.5 font-semibold">
              Usuario
            </th>
            <th scope="col" className="px-2 py-2.5 font-semibold">
              Email
            </th>
            <th scope="col" className="px-2 py-2.5 text-right font-semibold">
              Enlaces
            </th>
            <th scope="col" className="px-2 py-2.5 font-semibold">
              Rol
            </th>
            <th scope="col" className="px-2 py-2.5 font-semibold">
              Registrado
            </th>
            <th scope="col" className="px-2 py-2.5 text-right font-semibold">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isSelf = user.id === currentUserId
            const isUpdating = updatingId === user.id

            return (
              <tr key={user.id} className="border-b last:border-0">
                <td className="px-2 py-2.5 font-medium">{user.username}</td>
                <td className="px-2 py-2.5 text-muted-foreground">
                  {user.email}
                </td>
                <td className="px-2 py-2.5 text-right">{user.linkCount}</td>
                <td className="px-2 py-2.5">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-semibold",
                      user.role === "Admin"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}
                  >
                    {user.role === "Admin" ? "Admin" : "Usuario"}
                  </span>
                </td>
                <td className="px-2 py-2.5 whitespace-nowrap text-muted-foreground">
                  {dateFormatter.format(new Date(user.createdAt))}
                </td>
                <td className="px-2 py-1.5 text-right">
                  {isSelf ? (
                    <span className="text-sm text-muted-foreground">Tú</span>
                  ) : (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={isUpdating}
                      onClick={() => onToggleRole(user)}
                    >
                      {isUpdating
                        ? "Guardando..."
                        : user.role === "Admin"
                          ? "Hacer usuario"
                          : "Hacer admin"}
                    </Button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UsersTable
