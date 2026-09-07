# Requerimientos — Clínica Salud Integral

## 1. Entidades principales

- se identifican las siguientes entidades:

- Especialidad
- Médico
- Paciente
- Cita

La entidad `User` no se incluye en este documento

---

## 2. Entidad Especialidad

| Atributo | Tipo de dato | Restricciones / Notas |

| id | entero | [PK] |
| nombre | texto | [Único] [Obligatorio] |

---

## 3. Entidad Médico

| Atributo | Tipo de dato aproximado | Restricciones / Notas |

| id | entero | [PK] |
| nombre | texto | [Obligatorio] |
| apellido | texto | [Obligatorio] |
| especialidad_id | entero | [Obligatorio] [FK] |

---

## 4. Entidad Paciente

| Atributo | Tipo de dato aproximado | Restricciones / Notas |

| id | entero | [PK] |
| nombre | texto | [Obligatorio] |
| apellido | texto | [Obligatorio] |
| email | texto | [Único] [Obligatorio] |
| fecha_nacimiento | fecha | [Obligatorio] No puede ser futura |

---

## 5. Entidad Cita

| Atributo | Tipo de dato aproximado | Restricciones / Notas |

| id | entero | [PK] |
| paciente_id | entero | [Obligatorio] [FK] |
| medico_id | entero | [Obligatorio] [FK] |
| fecha_hora | fecha/hora | [Obligatorio] No puede ser pasada al agendar |
| estado | enum/texto | [Obligatorio] PROGRAMADA, COMPLETADA o CANCELADA |

---

## 6. Relaciones entre entidades

### Especialidad — Médico

Una especialidad puede tener muchos médicos, pero un médico pertenece a una sola especialidad.

### Médico — Cita

Un médico puede tener muchas citas, pero una cita pertenece a un solo médico.

### Paciente — Cita

Un paciente puede tener muchas citas, pero una cita pertenece a un solo paciente.

---

## 7. Reglas de negocio identificadas

- El correo electrónico del paciente debe tener un formato válido.
- La fecha de nacimiento de un paciente no puede ser futura.
- Una cita no puede ser agendada en una fecha que ya pasó.
- Una cita nace con estado `PROGRAMADA`.
- Una cita puede cambiar posteriormente a `COMPLETADA` o `CANCELADA`.
- Los médicos deben poder ser filtrados por especialidad.
- El expediente de un paciente debe permitir consultar sus datos personales y su historial de citas.
