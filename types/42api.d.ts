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
  project: {
    name: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
