export enum Roll {
    HR,
    FullStack,
    UX,
    TeamLeader
}

export interface EmployeeDataDto {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    roll: Roll,
    address: string,
}

export interface EmployeeData {
    id: number | string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    roll: Roll,
    address: string,
    startDate: Date
}
