/**
 * Статусы задач.
 */
export enum EStatus {
    TODO = 'TODO',
    DOING = 'DOING',
    DONE = 'DONE',
}

/**
 * Приоритеты задач.
 */
export enum EPriority {
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW',
}

/**
 * Типы маркеров в списке.
 */
export enum EMarkType {
    HIGH = 'danger',
    MEDIUM = 'warning',
    LOW = 'success',
}
