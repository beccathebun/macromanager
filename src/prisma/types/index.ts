import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValue: z.ZodType<Prisma.JsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]);

export type JsonValueType = z.infer<typeof JsonValue>;

export const NullableJsonValue = z
  .union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValue: z.ZodType<Prisma.InputJsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(InputJsonValue.nullable())),
  z.lazy(() => z.record(InputJsonValue.nullable())),
]);

export type InputJsonValueType = z.infer<typeof InputJsonValue>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['access','createdAt','id','keys','name','password','updatedAt']);

export const SessionScalarFieldEnumSchema = z.enum(['createdAt','id','userId']);

export const DeviceScalarFieldEnumSchema = z.enum(['access','createdAt','id','keys','name','updatedAt','userId']);

export const MacroScalarFieldEnumSchema = z.enum(['access','deviceId','endpoint','keys','params']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((v) => transformJsonNull(v));

export const QueryModeSchema = z.enum(['default','insensitive']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]);

export const NullsOrderSchema = z.enum(['first','last']);

export const AccesstypeSchema = z.enum(['SHARED','RESTRICTED','NONE']);

export type AccesstypeType = `${z.infer<typeof AccesstypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  access: AccesstypeSchema,
  createdAt: z.coerce.date(),
  id: z.string().uuid(),
  keys: z.string().array(),
  name: z.string(),
  password: z.string(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  createdAt: z.coerce.date(),
  id: z.string().uuid(),
  userId: z.string(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// DEVICE SCHEMA
/////////////////////////////////////////

export const DeviceSchema = z.object({
  access: AccesstypeSchema,
  createdAt: z.coerce.date(),
  id: z.string(),
  keys: z.string().array(),
  name: z.string(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
})

export type Device = z.infer<typeof DeviceSchema>

/////////////////////////////////////////
// MACRO SCHEMA
/////////////////////////////////////////

export const MacroSchema = z.object({
  access: AccesstypeSchema,
  deviceId: z.string(),
  endpoint: z.string(),
  keys: z.string().array(),
  params: NullableJsonValue.optional(),
})

export type Macro = z.infer<typeof MacroSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  devices: z.union([z.boolean(),z.lazy(() => DeviceFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  devices: z.boolean().optional(),
  sessions: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  access: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  id: z.boolean().optional(),
  keys: z.boolean().optional(),
  name: z.boolean().optional(),
  password: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  devices: z.union([z.boolean(),z.lazy(() => DeviceFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  createdAt: z.boolean().optional(),
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// DEVICE
//------------------------------------------------------

export const DeviceIncludeSchema: z.ZodType<Prisma.DeviceInclude> = z.object({
  macros: z.union([z.boolean(),z.lazy(() => MacroFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DeviceCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const DeviceArgsSchema: z.ZodType<Prisma.DeviceDefaultArgs> = z.object({
  select: z.lazy(() => DeviceSelectSchema).optional(),
  include: z.lazy(() => DeviceIncludeSchema).optional(),
}).strict();

export const DeviceCountOutputTypeArgsSchema: z.ZodType<Prisma.DeviceCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => DeviceCountOutputTypeSelectSchema).nullish(),
}).strict();

export const DeviceCountOutputTypeSelectSchema: z.ZodType<Prisma.DeviceCountOutputTypeSelect> = z.object({
  macros: z.boolean().optional(),
}).strict();

export const DeviceSelectSchema: z.ZodType<Prisma.DeviceSelect> = z.object({
  access: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  id: z.boolean().optional(),
  keys: z.boolean().optional(),
  name: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  macros: z.union([z.boolean(),z.lazy(() => MacroFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DeviceCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MACRO
//------------------------------------------------------

export const MacroIncludeSchema: z.ZodType<Prisma.MacroInclude> = z.object({
  device: z.union([z.boolean(),z.lazy(() => DeviceArgsSchema)]).optional(),
}).strict()

export const MacroArgsSchema: z.ZodType<Prisma.MacroDefaultArgs> = z.object({
  select: z.lazy(() => MacroSelectSchema).optional(),
  include: z.lazy(() => MacroIncludeSchema).optional(),
}).strict();

export const MacroSelectSchema: z.ZodType<Prisma.MacroSelect> = z.object({
  access: z.boolean().optional(),
  deviceId: z.boolean().optional(),
  endpoint: z.boolean().optional(),
  keys: z.boolean().optional(),
  params: z.boolean().optional(),
  device: z.union([z.boolean(),z.lazy(() => DeviceArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  access: z.union([ z.lazy(() => EnumAccesstypeFilterSchema),z.lazy(() => AccesstypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  keys: z.lazy(() => StringNullableListFilterSchema).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  devices: z.lazy(() => DeviceListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  access: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  keys: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  devices: z.lazy(() => DeviceOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  access: z.union([ z.lazy(() => EnumAccesstypeFilterSchema),z.lazy(() => AccesstypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  keys: z.lazy(() => StringNullableListFilterSchema).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  devices: z.lazy(() => DeviceListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  access: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  keys: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  access: z.union([ z.lazy(() => EnumAccesstypeWithAggregatesFilterSchema),z.lazy(() => AccesstypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  keys: z.lazy(() => StringNullableListFilterSchema).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const DeviceWhereInputSchema: z.ZodType<Prisma.DeviceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DeviceWhereInputSchema),z.lazy(() => DeviceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DeviceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DeviceWhereInputSchema),z.lazy(() => DeviceWhereInputSchema).array() ]).optional(),
  access: z.union([ z.lazy(() => EnumAccesstypeFilterSchema),z.lazy(() => AccesstypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  keys: z.lazy(() => StringNullableListFilterSchema).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  macros: z.lazy(() => MacroListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const DeviceOrderByWithRelationInputSchema: z.ZodType<Prisma.DeviceOrderByWithRelationInput> = z.object({
  access: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  keys: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  macros: z.lazy(() => MacroOrderByRelationAggregateInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const DeviceWhereUniqueInputSchema: z.ZodType<Prisma.DeviceWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => DeviceWhereInputSchema),z.lazy(() => DeviceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DeviceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DeviceWhereInputSchema),z.lazy(() => DeviceWhereInputSchema).array() ]).optional(),
  access: z.union([ z.lazy(() => EnumAccesstypeFilterSchema),z.lazy(() => AccesstypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  keys: z.lazy(() => StringNullableListFilterSchema).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  macros: z.lazy(() => MacroListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const DeviceOrderByWithAggregationInputSchema: z.ZodType<Prisma.DeviceOrderByWithAggregationInput> = z.object({
  access: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  keys: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DeviceCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DeviceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DeviceMinOrderByAggregateInputSchema).optional()
}).strict();

export const DeviceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DeviceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DeviceScalarWhereWithAggregatesInputSchema),z.lazy(() => DeviceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DeviceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DeviceScalarWhereWithAggregatesInputSchema),z.lazy(() => DeviceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  access: z.union([ z.lazy(() => EnumAccesstypeWithAggregatesFilterSchema),z.lazy(() => AccesstypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  keys: z.lazy(() => StringNullableListFilterSchema).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const MacroWhereInputSchema: z.ZodType<Prisma.MacroWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MacroWhereInputSchema),z.lazy(() => MacroWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MacroWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MacroWhereInputSchema),z.lazy(() => MacroWhereInputSchema).array() ]).optional(),
  access: z.union([ z.lazy(() => EnumAccesstypeFilterSchema),z.lazy(() => AccesstypeSchema) ]).optional(),
  deviceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  endpoint: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  keys: z.lazy(() => StringNullableListFilterSchema).optional(),
  params: z.lazy(() => JsonNullableFilterSchema).optional(),
  device: z.union([ z.lazy(() => DeviceRelationFilterSchema),z.lazy(() => DeviceWhereInputSchema) ]).optional(),
}).strict();

export const MacroOrderByWithRelationInputSchema: z.ZodType<Prisma.MacroOrderByWithRelationInput> = z.object({
  access: z.lazy(() => SortOrderSchema).optional(),
  deviceId: z.lazy(() => SortOrderSchema).optional(),
  endpoint: z.lazy(() => SortOrderSchema).optional(),
  keys: z.lazy(() => SortOrderSchema).optional(),
  params: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  device: z.lazy(() => DeviceOrderByWithRelationInputSchema).optional()
}).strict();

export const MacroWhereUniqueInputSchema: z.ZodType<Prisma.MacroWhereUniqueInput> = z.object({
  endpoint: z.string()
})
.and(z.object({
  endpoint: z.string().optional(),
  AND: z.union([ z.lazy(() => MacroWhereInputSchema),z.lazy(() => MacroWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MacroWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MacroWhereInputSchema),z.lazy(() => MacroWhereInputSchema).array() ]).optional(),
  access: z.union([ z.lazy(() => EnumAccesstypeFilterSchema),z.lazy(() => AccesstypeSchema) ]).optional(),
  deviceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  keys: z.lazy(() => StringNullableListFilterSchema).optional(),
  params: z.lazy(() => JsonNullableFilterSchema).optional(),
  device: z.union([ z.lazy(() => DeviceRelationFilterSchema),z.lazy(() => DeviceWhereInputSchema) ]).optional(),
}).strict());

export const MacroOrderByWithAggregationInputSchema: z.ZodType<Prisma.MacroOrderByWithAggregationInput> = z.object({
  access: z.lazy(() => SortOrderSchema).optional(),
  deviceId: z.lazy(() => SortOrderSchema).optional(),
  endpoint: z.lazy(() => SortOrderSchema).optional(),
  keys: z.lazy(() => SortOrderSchema).optional(),
  params: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => MacroCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MacroMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MacroMinOrderByAggregateInputSchema).optional()
}).strict();

export const MacroScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MacroScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MacroScalarWhereWithAggregatesInputSchema),z.lazy(() => MacroScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MacroScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MacroScalarWhereWithAggregatesInputSchema),z.lazy(() => MacroScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  access: z.union([ z.lazy(() => EnumAccesstypeWithAggregatesFilterSchema),z.lazy(() => AccesstypeSchema) ]).optional(),
  deviceId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  endpoint: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  keys: z.lazy(() => StringNullableListFilterSchema).optional(),
  params: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional()
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  access: z.lazy(() => AccesstypeSchema).optional(),
  createdAt: z.coerce.date().optional(),
  id: z.string().uuid().optional(),
  keys: z.union([ z.lazy(() => UserCreatekeysInputSchema),z.string().array() ]).optional(),
  name: z.string(),
  password: z.string(),
  updatedAt: z.coerce.date().optional(),
  devices: z.lazy(() => DeviceCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  access: z.lazy(() => AccesstypeSchema).optional(),
  createdAt: z.coerce.date().optional(),
  id: z.string().uuid().optional(),
  keys: z.union([ z.lazy(() => UserCreatekeysInputSchema),z.string().array() ]).optional(),
  name: z.string(),
  password: z.string(),
  updatedAt: z.coerce.date().optional(),
  devices: z.lazy(() => DeviceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => UserUpdatekeysInputSchema),z.string().array() ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  devices: z.lazy(() => DeviceUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => UserUpdatekeysInputSchema),z.string().array() ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  devices: z.lazy(() => DeviceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  access: z.lazy(() => AccesstypeSchema).optional(),
  createdAt: z.coerce.date().optional(),
  id: z.string().uuid().optional(),
  keys: z.union([ z.lazy(() => UserCreatekeysInputSchema),z.string().array() ]).optional(),
  name: z.string(),
  password: z.string(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => UserUpdatekeysInputSchema),z.string().array() ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => UserUpdatekeysInputSchema),z.string().array() ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  createdAt: z.coerce.date().optional(),
  id: z.string().uuid().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  createdAt: z.coerce.date().optional(),
  id: z.string().uuid().optional(),
  userId: z.string()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  createdAt: z.coerce.date().optional(),
  id: z.string().uuid().optional(),
  userId: z.string()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DeviceCreateInputSchema: z.ZodType<Prisma.DeviceCreateInput> = z.object({
  access: z.lazy(() => AccesstypeSchema).optional(),
  createdAt: z.coerce.date().optional(),
  id: z.string(),
  keys: z.union([ z.lazy(() => DeviceCreatekeysInputSchema),z.string().array() ]).optional(),
  name: z.string(),
  updatedAt: z.coerce.date().optional(),
  macros: z.lazy(() => MacroCreateNestedManyWithoutDeviceInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutDevicesInputSchema)
}).strict();

export const DeviceUncheckedCreateInputSchema: z.ZodType<Prisma.DeviceUncheckedCreateInput> = z.object({
  access: z.lazy(() => AccesstypeSchema).optional(),
  createdAt: z.coerce.date().optional(),
  id: z.string(),
  keys: z.union([ z.lazy(() => DeviceCreatekeysInputSchema),z.string().array() ]).optional(),
  name: z.string(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  macros: z.lazy(() => MacroUncheckedCreateNestedManyWithoutDeviceInputSchema).optional()
}).strict();

export const DeviceUpdateInputSchema: z.ZodType<Prisma.DeviceUpdateInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => DeviceUpdatekeysInputSchema),z.string().array() ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  macros: z.lazy(() => MacroUpdateManyWithoutDeviceNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutDevicesNestedInputSchema).optional()
}).strict();

export const DeviceUncheckedUpdateInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => DeviceUpdatekeysInputSchema),z.string().array() ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  macros: z.lazy(() => MacroUncheckedUpdateManyWithoutDeviceNestedInputSchema).optional()
}).strict();

export const DeviceCreateManyInputSchema: z.ZodType<Prisma.DeviceCreateManyInput> = z.object({
  access: z.lazy(() => AccesstypeSchema).optional(),
  createdAt: z.coerce.date().optional(),
  id: z.string(),
  keys: z.union([ z.lazy(() => DeviceCreatekeysInputSchema),z.string().array() ]).optional(),
  name: z.string(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const DeviceUpdateManyMutationInputSchema: z.ZodType<Prisma.DeviceUpdateManyMutationInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => DeviceUpdatekeysInputSchema),z.string().array() ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DeviceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateManyInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => DeviceUpdatekeysInputSchema),z.string().array() ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MacroCreateInputSchema: z.ZodType<Prisma.MacroCreateInput> = z.object({
  access: z.lazy(() => AccesstypeSchema).optional(),
  endpoint: z.string(),
  keys: z.union([ z.lazy(() => MacroCreatekeysInputSchema),z.string().array() ]).optional(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  device: z.lazy(() => DeviceCreateNestedOneWithoutMacrosInputSchema)
}).strict();

export const MacroUncheckedCreateInputSchema: z.ZodType<Prisma.MacroUncheckedCreateInput> = z.object({
  access: z.lazy(() => AccesstypeSchema).optional(),
  deviceId: z.string(),
  endpoint: z.string(),
  keys: z.union([ z.lazy(() => MacroCreatekeysInputSchema),z.string().array() ]).optional(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const MacroUpdateInputSchema: z.ZodType<Prisma.MacroUpdateInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  endpoint: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => MacroUpdatekeysInputSchema),z.string().array() ]).optional(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  device: z.lazy(() => DeviceUpdateOneRequiredWithoutMacrosNestedInputSchema).optional()
}).strict();

export const MacroUncheckedUpdateInputSchema: z.ZodType<Prisma.MacroUncheckedUpdateInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  deviceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endpoint: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => MacroUpdatekeysInputSchema),z.string().array() ]).optional(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const MacroCreateManyInputSchema: z.ZodType<Prisma.MacroCreateManyInput> = z.object({
  access: z.lazy(() => AccesstypeSchema).optional(),
  deviceId: z.string(),
  endpoint: z.string(),
  keys: z.union([ z.lazy(() => MacroCreatekeysInputSchema),z.string().array() ]).optional(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const MacroUpdateManyMutationInputSchema: z.ZodType<Prisma.MacroUpdateManyMutationInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  endpoint: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => MacroUpdatekeysInputSchema),z.string().array() ]).optional(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const MacroUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MacroUncheckedUpdateManyInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  deviceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endpoint: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => MacroUpdatekeysInputSchema),z.string().array() ]).optional(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const EnumAccesstypeFilterSchema: z.ZodType<Prisma.EnumAccesstypeFilter> = z.object({
  equals: z.lazy(() => AccesstypeSchema).optional(),
  in: z.lazy(() => AccesstypeSchema).array().optional(),
  notIn: z.lazy(() => AccesstypeSchema).array().optional(),
  not: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => NestedEnumAccesstypeFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const DeviceListRelationFilterSchema: z.ZodType<Prisma.DeviceListRelationFilter> = z.object({
  every: z.lazy(() => DeviceWhereInputSchema).optional(),
  some: z.lazy(() => DeviceWhereInputSchema).optional(),
  none: z.lazy(() => DeviceWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const DeviceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DeviceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  access: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  keys: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  access: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  access: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumAccesstypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAccesstypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AccesstypeSchema).optional(),
  in: z.lazy(() => AccesstypeSchema).array().optional(),
  notIn: z.lazy(() => AccesstypeSchema).array().optional(),
  not: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => NestedEnumAccesstypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAccesstypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAccesstypeFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MacroListRelationFilterSchema: z.ZodType<Prisma.MacroListRelationFilter> = z.object({
  every: z.lazy(() => MacroWhereInputSchema).optional(),
  some: z.lazy(() => MacroWhereInputSchema).optional(),
  none: z.lazy(() => MacroWhereInputSchema).optional()
}).strict();

export const MacroOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MacroOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DeviceCountOrderByAggregateInputSchema: z.ZodType<Prisma.DeviceCountOrderByAggregateInput> = z.object({
  access: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  keys: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DeviceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DeviceMaxOrderByAggregateInput> = z.object({
  access: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DeviceMinOrderByAggregateInputSchema: z.ZodType<Prisma.DeviceMinOrderByAggregateInput> = z.object({
  access: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: InputJsonValue.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: InputJsonValue.optional()
}).strict();

export const DeviceRelationFilterSchema: z.ZodType<Prisma.DeviceRelationFilter> = z.object({
  is: z.lazy(() => DeviceWhereInputSchema).optional(),
  isNot: z.lazy(() => DeviceWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const MacroCountOrderByAggregateInputSchema: z.ZodType<Prisma.MacroCountOrderByAggregateInput> = z.object({
  access: z.lazy(() => SortOrderSchema).optional(),
  deviceId: z.lazy(() => SortOrderSchema).optional(),
  endpoint: z.lazy(() => SortOrderSchema).optional(),
  keys: z.lazy(() => SortOrderSchema).optional(),
  params: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MacroMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MacroMaxOrderByAggregateInput> = z.object({
  access: z.lazy(() => SortOrderSchema).optional(),
  deviceId: z.lazy(() => SortOrderSchema).optional(),
  endpoint: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MacroMinOrderByAggregateInputSchema: z.ZodType<Prisma.MacroMinOrderByAggregateInput> = z.object({
  access: z.lazy(() => SortOrderSchema).optional(),
  deviceId: z.lazy(() => SortOrderSchema).optional(),
  endpoint: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: InputJsonValue.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: InputJsonValue.optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional()
}).strict();

export const UserCreatekeysInputSchema: z.ZodType<Prisma.UserCreatekeysInput> = z.object({
  set: z.string().array()
}).strict();

export const DeviceCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.DeviceCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => DeviceCreateWithoutUserInputSchema),z.lazy(() => DeviceCreateWithoutUserInputSchema).array(),z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema),z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DeviceCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DeviceUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.DeviceUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => DeviceCreateWithoutUserInputSchema),z.lazy(() => DeviceCreateWithoutUserInputSchema).array(),z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema),z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DeviceCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumAccesstypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAccesstypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AccesstypeSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const UserUpdatekeysInputSchema: z.ZodType<Prisma.UserUpdatekeysInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const DeviceUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.DeviceUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => DeviceCreateWithoutUserInputSchema),z.lazy(() => DeviceCreateWithoutUserInputSchema).array(),z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema),z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DeviceUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => DeviceUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DeviceCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DeviceUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => DeviceUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DeviceUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => DeviceUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DeviceScalarWhereInputSchema),z.lazy(() => DeviceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DeviceUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => DeviceCreateWithoutUserInputSchema),z.lazy(() => DeviceCreateWithoutUserInputSchema).array(),z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema),z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DeviceUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => DeviceUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DeviceCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DeviceUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => DeviceUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DeviceUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => DeviceUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DeviceScalarWhereInputSchema),z.lazy(() => DeviceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const DeviceCreatekeysInputSchema: z.ZodType<Prisma.DeviceCreatekeysInput> = z.object({
  set: z.string().array()
}).strict();

export const MacroCreateNestedManyWithoutDeviceInputSchema: z.ZodType<Prisma.MacroCreateNestedManyWithoutDeviceInput> = z.object({
  create: z.union([ z.lazy(() => MacroCreateWithoutDeviceInputSchema),z.lazy(() => MacroCreateWithoutDeviceInputSchema).array(),z.lazy(() => MacroUncheckedCreateWithoutDeviceInputSchema),z.lazy(() => MacroUncheckedCreateWithoutDeviceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MacroCreateOrConnectWithoutDeviceInputSchema),z.lazy(() => MacroCreateOrConnectWithoutDeviceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MacroCreateManyDeviceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MacroWhereUniqueInputSchema),z.lazy(() => MacroWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutDevicesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutDevicesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDevicesInputSchema),z.lazy(() => UserUncheckedCreateWithoutDevicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDevicesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const MacroUncheckedCreateNestedManyWithoutDeviceInputSchema: z.ZodType<Prisma.MacroUncheckedCreateNestedManyWithoutDeviceInput> = z.object({
  create: z.union([ z.lazy(() => MacroCreateWithoutDeviceInputSchema),z.lazy(() => MacroCreateWithoutDeviceInputSchema).array(),z.lazy(() => MacroUncheckedCreateWithoutDeviceInputSchema),z.lazy(() => MacroUncheckedCreateWithoutDeviceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MacroCreateOrConnectWithoutDeviceInputSchema),z.lazy(() => MacroCreateOrConnectWithoutDeviceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MacroCreateManyDeviceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MacroWhereUniqueInputSchema),z.lazy(() => MacroWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DeviceUpdatekeysInputSchema: z.ZodType<Prisma.DeviceUpdatekeysInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const MacroUpdateManyWithoutDeviceNestedInputSchema: z.ZodType<Prisma.MacroUpdateManyWithoutDeviceNestedInput> = z.object({
  create: z.union([ z.lazy(() => MacroCreateWithoutDeviceInputSchema),z.lazy(() => MacroCreateWithoutDeviceInputSchema).array(),z.lazy(() => MacroUncheckedCreateWithoutDeviceInputSchema),z.lazy(() => MacroUncheckedCreateWithoutDeviceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MacroCreateOrConnectWithoutDeviceInputSchema),z.lazy(() => MacroCreateOrConnectWithoutDeviceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MacroUpsertWithWhereUniqueWithoutDeviceInputSchema),z.lazy(() => MacroUpsertWithWhereUniqueWithoutDeviceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MacroCreateManyDeviceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MacroWhereUniqueInputSchema),z.lazy(() => MacroWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MacroWhereUniqueInputSchema),z.lazy(() => MacroWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MacroWhereUniqueInputSchema),z.lazy(() => MacroWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MacroWhereUniqueInputSchema),z.lazy(() => MacroWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MacroUpdateWithWhereUniqueWithoutDeviceInputSchema),z.lazy(() => MacroUpdateWithWhereUniqueWithoutDeviceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MacroUpdateManyWithWhereWithoutDeviceInputSchema),z.lazy(() => MacroUpdateManyWithWhereWithoutDeviceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MacroScalarWhereInputSchema),z.lazy(() => MacroScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutDevicesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutDevicesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDevicesInputSchema),z.lazy(() => UserUncheckedCreateWithoutDevicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDevicesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutDevicesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutDevicesInputSchema),z.lazy(() => UserUpdateWithoutDevicesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDevicesInputSchema) ]).optional(),
}).strict();

export const MacroUncheckedUpdateManyWithoutDeviceNestedInputSchema: z.ZodType<Prisma.MacroUncheckedUpdateManyWithoutDeviceNestedInput> = z.object({
  create: z.union([ z.lazy(() => MacroCreateWithoutDeviceInputSchema),z.lazy(() => MacroCreateWithoutDeviceInputSchema).array(),z.lazy(() => MacroUncheckedCreateWithoutDeviceInputSchema),z.lazy(() => MacroUncheckedCreateWithoutDeviceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MacroCreateOrConnectWithoutDeviceInputSchema),z.lazy(() => MacroCreateOrConnectWithoutDeviceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MacroUpsertWithWhereUniqueWithoutDeviceInputSchema),z.lazy(() => MacroUpsertWithWhereUniqueWithoutDeviceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MacroCreateManyDeviceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MacroWhereUniqueInputSchema),z.lazy(() => MacroWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MacroWhereUniqueInputSchema),z.lazy(() => MacroWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MacroWhereUniqueInputSchema),z.lazy(() => MacroWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MacroWhereUniqueInputSchema),z.lazy(() => MacroWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MacroUpdateWithWhereUniqueWithoutDeviceInputSchema),z.lazy(() => MacroUpdateWithWhereUniqueWithoutDeviceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MacroUpdateManyWithWhereWithoutDeviceInputSchema),z.lazy(() => MacroUpdateManyWithWhereWithoutDeviceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MacroScalarWhereInputSchema),z.lazy(() => MacroScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MacroCreatekeysInputSchema: z.ZodType<Prisma.MacroCreatekeysInput> = z.object({
  set: z.string().array()
}).strict();

export const DeviceCreateNestedOneWithoutMacrosInputSchema: z.ZodType<Prisma.DeviceCreateNestedOneWithoutMacrosInput> = z.object({
  create: z.union([ z.lazy(() => DeviceCreateWithoutMacrosInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutMacrosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DeviceCreateOrConnectWithoutMacrosInputSchema).optional(),
  connect: z.lazy(() => DeviceWhereUniqueInputSchema).optional()
}).strict();

export const MacroUpdatekeysInputSchema: z.ZodType<Prisma.MacroUpdatekeysInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const DeviceUpdateOneRequiredWithoutMacrosNestedInputSchema: z.ZodType<Prisma.DeviceUpdateOneRequiredWithoutMacrosNestedInput> = z.object({
  create: z.union([ z.lazy(() => DeviceCreateWithoutMacrosInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutMacrosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DeviceCreateOrConnectWithoutMacrosInputSchema).optional(),
  upsert: z.lazy(() => DeviceUpsertWithoutMacrosInputSchema).optional(),
  connect: z.lazy(() => DeviceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DeviceUpdateToOneWithWhereWithoutMacrosInputSchema),z.lazy(() => DeviceUpdateWithoutMacrosInputSchema),z.lazy(() => DeviceUncheckedUpdateWithoutMacrosInputSchema) ]).optional(),
}).strict();

export const NestedEnumAccesstypeFilterSchema: z.ZodType<Prisma.NestedEnumAccesstypeFilter> = z.object({
  equals: z.lazy(() => AccesstypeSchema).optional(),
  in: z.lazy(() => AccesstypeSchema).array().optional(),
  notIn: z.lazy(() => AccesstypeSchema).array().optional(),
  not: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => NestedEnumAccesstypeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedEnumAccesstypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAccesstypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AccesstypeSchema).optional(),
  in: z.lazy(() => AccesstypeSchema).array().optional(),
  notIn: z.lazy(() => AccesstypeSchema).array().optional(),
  not: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => NestedEnumAccesstypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAccesstypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAccesstypeFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: InputJsonValue.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: InputJsonValue.optional()
}).strict();

export const DeviceCreateWithoutUserInputSchema: z.ZodType<Prisma.DeviceCreateWithoutUserInput> = z.object({
  access: z.lazy(() => AccesstypeSchema).optional(),
  createdAt: z.coerce.date().optional(),
  id: z.string(),
  keys: z.union([ z.lazy(() => DeviceCreatekeysInputSchema),z.string().array() ]).optional(),
  name: z.string(),
  updatedAt: z.coerce.date().optional(),
  macros: z.lazy(() => MacroCreateNestedManyWithoutDeviceInputSchema).optional()
}).strict();

export const DeviceUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.DeviceUncheckedCreateWithoutUserInput> = z.object({
  access: z.lazy(() => AccesstypeSchema).optional(),
  createdAt: z.coerce.date().optional(),
  id: z.string(),
  keys: z.union([ z.lazy(() => DeviceCreatekeysInputSchema),z.string().array() ]).optional(),
  name: z.string(),
  updatedAt: z.coerce.date().optional(),
  macros: z.lazy(() => MacroUncheckedCreateNestedManyWithoutDeviceInputSchema).optional()
}).strict();

export const DeviceCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.DeviceCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => DeviceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DeviceCreateWithoutUserInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const DeviceCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.DeviceCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DeviceCreateManyUserInputSchema),z.lazy(() => DeviceCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  createdAt: z.coerce.date().optional(),
  id: z.string().uuid().optional()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  createdAt: z.coerce.date().optional(),
  id: z.string().uuid().optional()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const DeviceUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.DeviceUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => DeviceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DeviceUpdateWithoutUserInputSchema),z.lazy(() => DeviceUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => DeviceCreateWithoutUserInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const DeviceUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.DeviceUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => DeviceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DeviceUpdateWithoutUserInputSchema),z.lazy(() => DeviceUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const DeviceUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.DeviceUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => DeviceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DeviceUpdateManyMutationInputSchema),z.lazy(() => DeviceUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const DeviceScalarWhereInputSchema: z.ZodType<Prisma.DeviceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DeviceScalarWhereInputSchema),z.lazy(() => DeviceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DeviceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DeviceScalarWhereInputSchema),z.lazy(() => DeviceScalarWhereInputSchema).array() ]).optional(),
  access: z.union([ z.lazy(() => EnumAccesstypeFilterSchema),z.lazy(() => AccesstypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  keys: z.lazy(() => StringNullableListFilterSchema).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  access: z.lazy(() => AccesstypeSchema).optional(),
  createdAt: z.coerce.date().optional(),
  id: z.string().uuid().optional(),
  keys: z.union([ z.lazy(() => UserCreatekeysInputSchema),z.string().array() ]).optional(),
  name: z.string(),
  password: z.string(),
  updatedAt: z.coerce.date().optional(),
  devices: z.lazy(() => DeviceCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  access: z.lazy(() => AccesstypeSchema).optional(),
  createdAt: z.coerce.date().optional(),
  id: z.string().uuid().optional(),
  keys: z.union([ z.lazy(() => UserCreatekeysInputSchema),z.string().array() ]).optional(),
  name: z.string(),
  password: z.string(),
  updatedAt: z.coerce.date().optional(),
  devices: z.lazy(() => DeviceUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => UserUpdatekeysInputSchema),z.string().array() ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  devices: z.lazy(() => DeviceUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => UserUpdatekeysInputSchema),z.string().array() ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  devices: z.lazy(() => DeviceUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const MacroCreateWithoutDeviceInputSchema: z.ZodType<Prisma.MacroCreateWithoutDeviceInput> = z.object({
  access: z.lazy(() => AccesstypeSchema).optional(),
  endpoint: z.string(),
  keys: z.union([ z.lazy(() => MacroCreatekeysInputSchema),z.string().array() ]).optional(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const MacroUncheckedCreateWithoutDeviceInputSchema: z.ZodType<Prisma.MacroUncheckedCreateWithoutDeviceInput> = z.object({
  access: z.lazy(() => AccesstypeSchema).optional(),
  endpoint: z.string(),
  keys: z.union([ z.lazy(() => MacroCreatekeysInputSchema),z.string().array() ]).optional(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const MacroCreateOrConnectWithoutDeviceInputSchema: z.ZodType<Prisma.MacroCreateOrConnectWithoutDeviceInput> = z.object({
  where: z.lazy(() => MacroWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MacroCreateWithoutDeviceInputSchema),z.lazy(() => MacroUncheckedCreateWithoutDeviceInputSchema) ]),
}).strict();

export const MacroCreateManyDeviceInputEnvelopeSchema: z.ZodType<Prisma.MacroCreateManyDeviceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MacroCreateManyDeviceInputSchema),z.lazy(() => MacroCreateManyDeviceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserCreateWithoutDevicesInputSchema: z.ZodType<Prisma.UserCreateWithoutDevicesInput> = z.object({
  access: z.lazy(() => AccesstypeSchema).optional(),
  createdAt: z.coerce.date().optional(),
  id: z.string().uuid().optional(),
  keys: z.union([ z.lazy(() => UserCreatekeysInputSchema),z.string().array() ]).optional(),
  name: z.string(),
  password: z.string(),
  updatedAt: z.coerce.date().optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutDevicesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutDevicesInput> = z.object({
  access: z.lazy(() => AccesstypeSchema).optional(),
  createdAt: z.coerce.date().optional(),
  id: z.string().uuid().optional(),
  keys: z.union([ z.lazy(() => UserCreatekeysInputSchema),z.string().array() ]).optional(),
  name: z.string(),
  password: z.string(),
  updatedAt: z.coerce.date().optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutDevicesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutDevicesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutDevicesInputSchema),z.lazy(() => UserUncheckedCreateWithoutDevicesInputSchema) ]),
}).strict();

export const MacroUpsertWithWhereUniqueWithoutDeviceInputSchema: z.ZodType<Prisma.MacroUpsertWithWhereUniqueWithoutDeviceInput> = z.object({
  where: z.lazy(() => MacroWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MacroUpdateWithoutDeviceInputSchema),z.lazy(() => MacroUncheckedUpdateWithoutDeviceInputSchema) ]),
  create: z.union([ z.lazy(() => MacroCreateWithoutDeviceInputSchema),z.lazy(() => MacroUncheckedCreateWithoutDeviceInputSchema) ]),
}).strict();

export const MacroUpdateWithWhereUniqueWithoutDeviceInputSchema: z.ZodType<Prisma.MacroUpdateWithWhereUniqueWithoutDeviceInput> = z.object({
  where: z.lazy(() => MacroWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MacroUpdateWithoutDeviceInputSchema),z.lazy(() => MacroUncheckedUpdateWithoutDeviceInputSchema) ]),
}).strict();

export const MacroUpdateManyWithWhereWithoutDeviceInputSchema: z.ZodType<Prisma.MacroUpdateManyWithWhereWithoutDeviceInput> = z.object({
  where: z.lazy(() => MacroScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MacroUpdateManyMutationInputSchema),z.lazy(() => MacroUncheckedUpdateManyWithoutDeviceInputSchema) ]),
}).strict();

export const MacroScalarWhereInputSchema: z.ZodType<Prisma.MacroScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MacroScalarWhereInputSchema),z.lazy(() => MacroScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MacroScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MacroScalarWhereInputSchema),z.lazy(() => MacroScalarWhereInputSchema).array() ]).optional(),
  access: z.union([ z.lazy(() => EnumAccesstypeFilterSchema),z.lazy(() => AccesstypeSchema) ]).optional(),
  deviceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  endpoint: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  keys: z.lazy(() => StringNullableListFilterSchema).optional(),
  params: z.lazy(() => JsonNullableFilterSchema).optional()
}).strict();

export const UserUpsertWithoutDevicesInputSchema: z.ZodType<Prisma.UserUpsertWithoutDevicesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutDevicesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDevicesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutDevicesInputSchema),z.lazy(() => UserUncheckedCreateWithoutDevicesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutDevicesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutDevicesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutDevicesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDevicesInputSchema) ]),
}).strict();

export const UserUpdateWithoutDevicesInputSchema: z.ZodType<Prisma.UserUpdateWithoutDevicesInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => UserUpdatekeysInputSchema),z.string().array() ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutDevicesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutDevicesInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => UserUpdatekeysInputSchema),z.string().array() ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const DeviceCreateWithoutMacrosInputSchema: z.ZodType<Prisma.DeviceCreateWithoutMacrosInput> = z.object({
  access: z.lazy(() => AccesstypeSchema).optional(),
  createdAt: z.coerce.date().optional(),
  id: z.string(),
  keys: z.union([ z.lazy(() => DeviceCreatekeysInputSchema),z.string().array() ]).optional(),
  name: z.string(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutDevicesInputSchema)
}).strict();

export const DeviceUncheckedCreateWithoutMacrosInputSchema: z.ZodType<Prisma.DeviceUncheckedCreateWithoutMacrosInput> = z.object({
  access: z.lazy(() => AccesstypeSchema).optional(),
  createdAt: z.coerce.date().optional(),
  id: z.string(),
  keys: z.union([ z.lazy(() => DeviceCreatekeysInputSchema),z.string().array() ]).optional(),
  name: z.string(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const DeviceCreateOrConnectWithoutMacrosInputSchema: z.ZodType<Prisma.DeviceCreateOrConnectWithoutMacrosInput> = z.object({
  where: z.lazy(() => DeviceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DeviceCreateWithoutMacrosInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutMacrosInputSchema) ]),
}).strict();

export const DeviceUpsertWithoutMacrosInputSchema: z.ZodType<Prisma.DeviceUpsertWithoutMacrosInput> = z.object({
  update: z.union([ z.lazy(() => DeviceUpdateWithoutMacrosInputSchema),z.lazy(() => DeviceUncheckedUpdateWithoutMacrosInputSchema) ]),
  create: z.union([ z.lazy(() => DeviceCreateWithoutMacrosInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutMacrosInputSchema) ]),
  where: z.lazy(() => DeviceWhereInputSchema).optional()
}).strict();

export const DeviceUpdateToOneWithWhereWithoutMacrosInputSchema: z.ZodType<Prisma.DeviceUpdateToOneWithWhereWithoutMacrosInput> = z.object({
  where: z.lazy(() => DeviceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DeviceUpdateWithoutMacrosInputSchema),z.lazy(() => DeviceUncheckedUpdateWithoutMacrosInputSchema) ]),
}).strict();

export const DeviceUpdateWithoutMacrosInputSchema: z.ZodType<Prisma.DeviceUpdateWithoutMacrosInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => DeviceUpdatekeysInputSchema),z.string().array() ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutDevicesNestedInputSchema).optional()
}).strict();

export const DeviceUncheckedUpdateWithoutMacrosInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateWithoutMacrosInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => DeviceUpdatekeysInputSchema),z.string().array() ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DeviceCreateManyUserInputSchema: z.ZodType<Prisma.DeviceCreateManyUserInput> = z.object({
  access: z.lazy(() => AccesstypeSchema).optional(),
  createdAt: z.coerce.date().optional(),
  id: z.string(),
  keys: z.union([ z.lazy(() => DeviceCreatekeysInputSchema),z.string().array() ]).optional(),
  name: z.string(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  createdAt: z.coerce.date().optional(),
  id: z.string().uuid().optional()
}).strict();

export const DeviceUpdateWithoutUserInputSchema: z.ZodType<Prisma.DeviceUpdateWithoutUserInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => DeviceUpdatekeysInputSchema),z.string().array() ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  macros: z.lazy(() => MacroUpdateManyWithoutDeviceNestedInputSchema).optional()
}).strict();

export const DeviceUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateWithoutUserInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => DeviceUpdatekeysInputSchema),z.string().array() ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  macros: z.lazy(() => MacroUncheckedUpdateManyWithoutDeviceNestedInputSchema).optional()
}).strict();

export const DeviceUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateManyWithoutUserInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => DeviceUpdatekeysInputSchema),z.string().array() ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MacroCreateManyDeviceInputSchema: z.ZodType<Prisma.MacroCreateManyDeviceInput> = z.object({
  access: z.lazy(() => AccesstypeSchema).optional(),
  endpoint: z.string(),
  keys: z.union([ z.lazy(() => MacroCreatekeysInputSchema),z.string().array() ]).optional(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const MacroUpdateWithoutDeviceInputSchema: z.ZodType<Prisma.MacroUpdateWithoutDeviceInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  endpoint: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => MacroUpdatekeysInputSchema),z.string().array() ]).optional(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const MacroUncheckedUpdateWithoutDeviceInputSchema: z.ZodType<Prisma.MacroUncheckedUpdateWithoutDeviceInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  endpoint: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => MacroUpdatekeysInputSchema),z.string().array() ]).optional(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const MacroUncheckedUpdateManyWithoutDeviceInputSchema: z.ZodType<Prisma.MacroUncheckedUpdateManyWithoutDeviceInput> = z.object({
  access: z.union([ z.lazy(() => AccesstypeSchema),z.lazy(() => EnumAccesstypeFieldUpdateOperationsInputSchema) ]).optional(),
  endpoint: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keys: z.union([ z.lazy(() => MacroUpdatekeysInputSchema),z.string().array() ]).optional(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const DeviceFindFirstArgsSchema: z.ZodType<Prisma.DeviceFindFirstArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  where: DeviceWhereInputSchema.optional(),
  orderBy: z.union([ DeviceOrderByWithRelationInputSchema.array(),DeviceOrderByWithRelationInputSchema ]).optional(),
  cursor: DeviceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DeviceScalarFieldEnumSchema,DeviceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const DeviceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DeviceFindFirstOrThrowArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  where: DeviceWhereInputSchema.optional(),
  orderBy: z.union([ DeviceOrderByWithRelationInputSchema.array(),DeviceOrderByWithRelationInputSchema ]).optional(),
  cursor: DeviceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DeviceScalarFieldEnumSchema,DeviceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const DeviceFindManyArgsSchema: z.ZodType<Prisma.DeviceFindManyArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  where: DeviceWhereInputSchema.optional(),
  orderBy: z.union([ DeviceOrderByWithRelationInputSchema.array(),DeviceOrderByWithRelationInputSchema ]).optional(),
  cursor: DeviceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DeviceScalarFieldEnumSchema,DeviceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const DeviceAggregateArgsSchema: z.ZodType<Prisma.DeviceAggregateArgs> = z.object({
  where: DeviceWhereInputSchema.optional(),
  orderBy: z.union([ DeviceOrderByWithRelationInputSchema.array(),DeviceOrderByWithRelationInputSchema ]).optional(),
  cursor: DeviceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const DeviceGroupByArgsSchema: z.ZodType<Prisma.DeviceGroupByArgs> = z.object({
  where: DeviceWhereInputSchema.optional(),
  orderBy: z.union([ DeviceOrderByWithAggregationInputSchema.array(),DeviceOrderByWithAggregationInputSchema ]).optional(),
  by: DeviceScalarFieldEnumSchema.array(),
  having: DeviceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const DeviceFindUniqueArgsSchema: z.ZodType<Prisma.DeviceFindUniqueArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  where: DeviceWhereUniqueInputSchema,
}).strict()

export const DeviceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DeviceFindUniqueOrThrowArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  where: DeviceWhereUniqueInputSchema,
}).strict()

export const MacroFindFirstArgsSchema: z.ZodType<Prisma.MacroFindFirstArgs> = z.object({
  select: MacroSelectSchema.optional(),
  include: MacroIncludeSchema.optional(),
  where: MacroWhereInputSchema.optional(),
  orderBy: z.union([ MacroOrderByWithRelationInputSchema.array(),MacroOrderByWithRelationInputSchema ]).optional(),
  cursor: MacroWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MacroScalarFieldEnumSchema,MacroScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MacroFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MacroFindFirstOrThrowArgs> = z.object({
  select: MacroSelectSchema.optional(),
  include: MacroIncludeSchema.optional(),
  where: MacroWhereInputSchema.optional(),
  orderBy: z.union([ MacroOrderByWithRelationInputSchema.array(),MacroOrderByWithRelationInputSchema ]).optional(),
  cursor: MacroWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MacroScalarFieldEnumSchema,MacroScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MacroFindManyArgsSchema: z.ZodType<Prisma.MacroFindManyArgs> = z.object({
  select: MacroSelectSchema.optional(),
  include: MacroIncludeSchema.optional(),
  where: MacroWhereInputSchema.optional(),
  orderBy: z.union([ MacroOrderByWithRelationInputSchema.array(),MacroOrderByWithRelationInputSchema ]).optional(),
  cursor: MacroWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MacroScalarFieldEnumSchema,MacroScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MacroAggregateArgsSchema: z.ZodType<Prisma.MacroAggregateArgs> = z.object({
  where: MacroWhereInputSchema.optional(),
  orderBy: z.union([ MacroOrderByWithRelationInputSchema.array(),MacroOrderByWithRelationInputSchema ]).optional(),
  cursor: MacroWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const MacroGroupByArgsSchema: z.ZodType<Prisma.MacroGroupByArgs> = z.object({
  where: MacroWhereInputSchema.optional(),
  orderBy: z.union([ MacroOrderByWithAggregationInputSchema.array(),MacroOrderByWithAggregationInputSchema ]).optional(),
  by: MacroScalarFieldEnumSchema.array(),
  having: MacroScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const MacroFindUniqueArgsSchema: z.ZodType<Prisma.MacroFindUniqueArgs> = z.object({
  select: MacroSelectSchema.optional(),
  include: MacroIncludeSchema.optional(),
  where: MacroWhereUniqueInputSchema,
}).strict()

export const MacroFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MacroFindUniqueOrThrowArgs> = z.object({
  select: MacroSelectSchema.optional(),
  include: MacroIncludeSchema.optional(),
  where: MacroWhereUniqueInputSchema,
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict()

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict()

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict()

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict()

export const DeviceCreateArgsSchema: z.ZodType<Prisma.DeviceCreateArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  data: z.union([ DeviceCreateInputSchema,DeviceUncheckedCreateInputSchema ]),
}).strict()

export const DeviceUpsertArgsSchema: z.ZodType<Prisma.DeviceUpsertArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  where: DeviceWhereUniqueInputSchema,
  create: z.union([ DeviceCreateInputSchema,DeviceUncheckedCreateInputSchema ]),
  update: z.union([ DeviceUpdateInputSchema,DeviceUncheckedUpdateInputSchema ]),
}).strict()

export const DeviceCreateManyArgsSchema: z.ZodType<Prisma.DeviceCreateManyArgs> = z.object({
  data: z.union([ DeviceCreateManyInputSchema,DeviceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const DeviceDeleteArgsSchema: z.ZodType<Prisma.DeviceDeleteArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  where: DeviceWhereUniqueInputSchema,
}).strict()

export const DeviceUpdateArgsSchema: z.ZodType<Prisma.DeviceUpdateArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  data: z.union([ DeviceUpdateInputSchema,DeviceUncheckedUpdateInputSchema ]),
  where: DeviceWhereUniqueInputSchema,
}).strict()

export const DeviceUpdateManyArgsSchema: z.ZodType<Prisma.DeviceUpdateManyArgs> = z.object({
  data: z.union([ DeviceUpdateManyMutationInputSchema,DeviceUncheckedUpdateManyInputSchema ]),
  where: DeviceWhereInputSchema.optional(),
}).strict()

export const DeviceDeleteManyArgsSchema: z.ZodType<Prisma.DeviceDeleteManyArgs> = z.object({
  where: DeviceWhereInputSchema.optional(),
}).strict()

export const MacroCreateArgsSchema: z.ZodType<Prisma.MacroCreateArgs> = z.object({
  select: MacroSelectSchema.optional(),
  include: MacroIncludeSchema.optional(),
  data: z.union([ MacroCreateInputSchema,MacroUncheckedCreateInputSchema ]),
}).strict()

export const MacroUpsertArgsSchema: z.ZodType<Prisma.MacroUpsertArgs> = z.object({
  select: MacroSelectSchema.optional(),
  include: MacroIncludeSchema.optional(),
  where: MacroWhereUniqueInputSchema,
  create: z.union([ MacroCreateInputSchema,MacroUncheckedCreateInputSchema ]),
  update: z.union([ MacroUpdateInputSchema,MacroUncheckedUpdateInputSchema ]),
}).strict()

export const MacroCreateManyArgsSchema: z.ZodType<Prisma.MacroCreateManyArgs> = z.object({
  data: z.union([ MacroCreateManyInputSchema,MacroCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const MacroDeleteArgsSchema: z.ZodType<Prisma.MacroDeleteArgs> = z.object({
  select: MacroSelectSchema.optional(),
  include: MacroIncludeSchema.optional(),
  where: MacroWhereUniqueInputSchema,
}).strict()

export const MacroUpdateArgsSchema: z.ZodType<Prisma.MacroUpdateArgs> = z.object({
  select: MacroSelectSchema.optional(),
  include: MacroIncludeSchema.optional(),
  data: z.union([ MacroUpdateInputSchema,MacroUncheckedUpdateInputSchema ]),
  where: MacroWhereUniqueInputSchema,
}).strict()

export const MacroUpdateManyArgsSchema: z.ZodType<Prisma.MacroUpdateManyArgs> = z.object({
  data: z.union([ MacroUpdateManyMutationInputSchema,MacroUncheckedUpdateManyInputSchema ]),
  where: MacroWhereInputSchema.optional(),
}).strict()

export const MacroDeleteManyArgsSchema: z.ZodType<Prisma.MacroDeleteManyArgs> = z.object({
  where: MacroWhereInputSchema.optional(),
}).strict()