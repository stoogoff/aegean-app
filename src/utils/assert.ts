// generic asserts

export const notNull = (value: unknown | null | undefined): boolean
	=> value !== undefined && value !== null

export const isNull = (value: unknown | null | undefined): boolean
	=> value === undefined || value  === null

export const throwIfNull = (value: unknown | null | undefined, name: string, message: string) => {
	if(isNull(value))
		throw new Error(message || `Null or undefined value found for '${name}'`)
}

export const notIn = (property: string, obj: Record<string, unknown>): boolean => !(property in obj)

export const isIn = (property: string, obj: Record<string, unknown>): boolean => property in obj

export const notEmptyString = (value: unknown | null | undefined): boolean
	=> notNull(value) && value !== ''

export const isEmptyString = (value: unknown | null | undefined): boolean
	=> isNull(value) || value === ''

export const isEmptyArray = (value: unknown | null | undefined): boolean
	=> isNull(value) || Array.isArray(value) && value.length === 0

export const notEmptyArray = (value: unknown | null | undefined): boolean
	=> notNull(value) && Array.isArray(value) && value.length !== 0

export const isFunction = (value: unknown | null | undefined): boolean
	=> notNull(value) && typeof value === 'function'
