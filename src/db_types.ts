export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          created_at: string
          date: string
          description: string
          id: string
          location: string | null
          media: string | null
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          description: string
          id?: string
          location?: string | null
          media?: string | null
          name: string
          user_id?: string
        }
        Update: {
          created_at?: string
          date?: string
          description?: string
          id?: string
          location?: string | null
          media?: string | null
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: number
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      post_interactions: {
        Row: {
          content: string | null
          created_at: string
          id: number
          interaction_type: string
          post_id: string
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          interaction_type: string
          post_id: string
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          interaction_type?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_interactions_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_interactions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      posts: {
        Row: {
          content: string
          created_at: string
          id: string
          image: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          image?: string | null
          user_id?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          image?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reels: {
        Row: {
          content: string | null
          created_at: string
          id: string
          user_id: string
          video: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          user_id?: string
          video?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          user_id?: string
          video?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reels_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      Tasks: {
        Row: {
          created_at: string
          description: string | null
          id: number
          owner: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          owner?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          owner?: string | null
          title?: string | null
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
