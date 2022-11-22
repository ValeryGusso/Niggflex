export type StaffResponse = Person[]

export interface Person {
  staffId: number
  nameRu: string
  nameEn: string
  description: string | null
  posterUrl: string
  professionText: string
  professionKey: string
}