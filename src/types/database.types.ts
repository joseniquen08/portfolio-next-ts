export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      admin_preferences: {
        Row: {
          key: string
          updated_at: string
          user_id: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          user_id: string
          value?: Json
        }
        Update: {
          key?: string
          updated_at?: string
          user_id?: string
          value?: Json
        }
        Relationships: []
      }
      card_statements: {
        Row: {
          amounts: Json
          card_id: string
          created_at: string
          cycle_end: string | null
          cycle_start: string | null
          due_date: string | null
          id: string
          insurance_amount: number
          is_estimated: boolean
          is_paid: boolean
          period: string
          user_id: string
        }
        Insert: {
          amounts?: Json
          card_id: string
          created_at?: string
          cycle_end?: string | null
          cycle_start?: string | null
          due_date?: string | null
          id?: string
          insurance_amount?: number
          is_estimated?: boolean
          is_paid?: boolean
          period: string
          user_id?: string
        }
        Update: {
          amounts?: Json
          card_id?: string
          created_at?: string
          cycle_end?: string | null
          cycle_start?: string | null
          due_date?: string | null
          id?: string
          insurance_amount?: number
          is_estimated?: boolean
          is_paid?: boolean
          period?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "card_statements_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "credit_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      credit_cards: {
        Row: {
          color: string | null
          created_at: string
          currencies: string[]
          default_cycle_end_day: number | null
          default_cycle_start_day: number | null
          default_payment_day: number | null
          id: string
          name: string
          sort_order: number
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          currencies?: string[]
          default_cycle_end_day?: number | null
          default_cycle_start_day?: number | null
          default_payment_day?: number | null
          id?: string
          name: string
          sort_order?: number
          user_id?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          currencies?: string[]
          default_cycle_end_day?: number | null
          default_cycle_start_day?: number | null
          default_payment_day?: number | null
          id?: string
          name?: string
          sort_order?: number
          user_id?: string
        }
        Relationships: []
      }
      credit_limit_changes: {
        Row: {
          amount: number
          card_id: string
          created_at: string
          currency: string
          end_date: string | null
          id: string
          note: string | null
          start_date: string | null
          user_id: string
        }
        Insert: {
          amount: number
          card_id: string
          created_at?: string
          currency: string
          end_date?: string | null
          id?: string
          note?: string | null
          start_date?: string | null
          user_id?: string
        }
        Update: {
          amount?: number
          card_id?: string
          created_at?: string
          currency?: string
          end_date?: string | null
          id?: string
          note?: string | null
          start_date?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "credit_limit_changes_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "credit_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      income_entries: {
        Row: {
          amount: number
          created_at: string
          currency: string
          description: string | null
          expected_date: string | null
          id: string
          is_paid: boolean
          job_id: string
          linked_final_id: string | null
          mes_esperado: string
          paid_date: string | null
          payment_type: string
          sort_order: number
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          currency?: string
          description?: string | null
          expected_date?: string | null
          id?: string
          is_paid?: boolean
          job_id: string
          linked_final_id?: string | null
          mes_esperado: string
          paid_date?: string | null
          payment_type: string
          sort_order?: number
          user_id?: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          description?: string | null
          expected_date?: string | null
          id?: string
          is_paid?: boolean
          job_id?: string
          linked_final_id?: string | null
          mes_esperado?: string
          paid_date?: string | null
          payment_type?: string
          sort_order?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "income_entries_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "income_entries_linked_final_id_fkey"
            columns: ["linked_final_id"]
            isOneToOne: false
            referencedRelation: "income_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          color: string | null
          created_at: string
          id: string
          is_active: boolean
          name: string
          sort_order: number
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          sort_order?: number
          user_id?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          sort_order?: number
          user_id?: string
        }
        Relationships: []
      }
      period_adjustments: {
        Row: {
          amount: number
          created_at: string
          id: string
          note: string | null
          period: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          note?: string | null
          period: string
          user_id?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          note?: string | null
          period?: string
          user_id?: string
        }
        Relationships: []
      }
      statement_advances: {
        Row: {
          advance_date: string
          amount: number
          created_at: string
          currency: string
          id: string
          note: string | null
          statement_id: string
          user_id: string
        }
        Insert: {
          advance_date?: string
          amount: number
          created_at?: string
          currency: string
          id?: string
          note?: string | null
          statement_id: string
          user_id?: string
        }
        Update: {
          advance_date?: string
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          note?: string | null
          statement_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "statement_advances_statement_id_fkey"
            columns: ["statement_id"]
            isOneToOne: false
            referencedRelation: "card_statements"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          job_id: string
          priority: string
          sort_order: number
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          job_id: string
          priority?: string
          sort_order?: number
          status?: string
          title: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          job_id?: string
          priority?: string
          sort_order?: number
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_credit_limit_change: {
        Args: {
          p_amount: number
          p_card_id: string
          p_currency: string
          p_note: string
          p_start_date: string
        }
        Returns: {
          amount: number
          card_id: string
          created_at: string
          currency: string
          end_date: string | null
          id: string
          note: string | null
          start_date: string | null
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "credit_limit_changes"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      delete_credit_limit_change: { Args: { p_id: string }; Returns: undefined }
      reorder_credit_cards: {
        Args: { ordered_ids: string[] }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
