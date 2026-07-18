export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_preferences: {
        Row: {
          user_id:    string
          key:        string
          value:      Json
          updated_at: string
        }
        Insert: {
          user_id:    string
          key:        string
          value:      Json
          updated_at?: string
        }
        Update: {
          user_id?:    string
          key?:        string
          value?:      Json
          updated_at?: string
        }
        Relationships: []
      }
      card_statements: {
        Row: {
          id: string
          user_id: string
          card_id: string
          period: string
          amounts: Json
          due_date: string | null
          cycle_start: string | null
          cycle_end: string | null
          is_estimated: boolean
          is_paid: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          card_id: string
          period: string
          amounts: Json
          due_date?: string | null
          cycle_start?: string | null
          cycle_end?: string | null
          is_estimated?: boolean
          is_paid?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          card_id?: string
          period?: string
          amounts?: Json
          due_date?: string | null
          cycle_start?: string | null
          cycle_end?: string | null
          is_estimated?: boolean
          is_paid?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "card_statements_card_id_fkey"
            columns: ["card_id"]
            referencedRelation: "credit_cards"
            referencedColumns: ["id"]
          }
        ]
      }
      jobs: {
        Row: {
          id: string
          user_id: string
          name: string
          color: string | null
          is_active: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          name: string
          color?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          color?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          id: string
          user_id: string
          job_id: string
          title: string
          description: string | null
          status: string
          priority: string
          due_date: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          job_id: string
          title: string
          description?: string | null
          status?: string
          priority?: string
          due_date?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          job_id?: string
          title?: string
          description?: string | null
          status?: string
          priority?: string
          due_date?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_job_id_fkey"
            columns: ["job_id"]
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          }
        ]
      }
      credit_cards: {
        Row: {
          id: string
          user_id: string
          name: string
          color: string | null
          default_payment_day: number
          default_cycle_start_day: number
          default_cycle_end_day: number
          currencies: string[]
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          name: string
          color?: string | null
          default_payment_day?: number
          default_cycle_start_day?: number
          default_cycle_end_day?: number
          currencies?: string[]
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          color?: string | null
          default_payment_day?: number
          default_cycle_start_day?: number
          default_cycle_end_day?: number
          currencies?: string[]
          sort_order?: number
          created_at?: string
        }
        Relationships: []
      }
      income_entries: {
        Row: {
          id: string
          user_id: string
          job_id: string
          income_type: string
          description: string | null
          amount: number
          currency: string
          period: string | null
          entry_date: string | null
          expected_date: string | null
          paid_date: string | null
          is_paid: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          job_id: string
          income_type: string
          description?: string | null
          amount?: number
          currency?: string
          period?: string | null
          entry_date?: string | null
          expected_date?: string | null
          paid_date?: string | null
          is_paid?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          job_id?: string
          income_type?: string
          description?: string | null
          amount?: number
          currency?: string
          period?: string | null
          entry_date?: string | null
          expected_date?: string | null
          paid_date?: string | null
          is_paid?: boolean
          sort_order?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "income_entries_job_id_fkey"
            columns: ["job_id"]
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          }
        ]
      }
      period_adjustments: {
        Row: {
          id: string
          user_id: string
          period: string
          amount: number
          note: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          period: string
          amount: number
          note?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          period?: string
          amount?: number
          note?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
