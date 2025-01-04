export interface UserProfile {
  first_name: string
  campus: Campus[]
  projects_users: ProjectUser[]
}

// Define Campus interface based on expected API structure
export interface Campus {
  id: number
  name: string
}

export interface ProjectUser {
  id: number
  occurrence: number
  final_mark: number | null
  status: 'in_progress' | 'completed' | 'failed' | 'waiting' | 'pending' // Add other possible statuses if needed
  validated?: boolean | null // Nullable boolean (true = validated, false = not validated, null = not finished)
  current_team_id: number
  project: Project
  cursus_ids: number[]
  marked_at: string | null
  marked: boolean
  retriable_at: string | null
  created_at: string
  updated_at: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
export interface Project {
  id: number
  name: string
  slug: string
  parent_id: number | null
}

export interface ProjectsUserList {
  projects_users: ProjectsUser[]
}
