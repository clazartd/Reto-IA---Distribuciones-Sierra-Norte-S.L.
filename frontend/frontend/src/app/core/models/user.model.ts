/**
 * Interfaz UserModel tipada para uso en autenticación y control de sesión.
 * Extensible para futuros atributos pero limitado ahora a id, username y role.
 */
export interface User {
  id: number;
  username: string;
  role: string;
}
