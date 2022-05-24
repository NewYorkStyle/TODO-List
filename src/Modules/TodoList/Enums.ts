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
    HIGH = 2,
    MEDIUM = 1,
    LOW = 0,
}

/**
 * Типы маркеров в списке.
 */
export enum EMarkType {
    HIGH = 'danger',
    MEDIUM = 'warning',
    LOW = 'success',
}

/**
 * Поддерживаемые языки.
 */
export enum ELanguage {
    EN = 'en',
    RU = 'ru'
}
