import baseTypeDefs from './base-type-defs.js';
// from graphql admin
//type-defs
import vehicleModelTypeDefs from './admin/type-defs/vehicle-model-type-defs.js';
import vehicleInventoryTypeDefs from './admin/type-defs/vehicle-inventory-type-defs.js';
//resolvers
import vehicleModelResolvers from './admin/resolvers/vehicle-model-resolvers.js';
import vehicleInventoryResolvers from './admin/resolvers/vehicle-inventory-resolvers.js';

// from graphql customer 
// type-defs 
import customerTypeDefs from './customer/type-defs/customer-type-defs.js'; 
import vehicleTypeDefs from './customer/type-defs/vehicle-type-defs.js';
// resolvers 
import customerResolvers from './customer/resolvers/customer-resolvers.js'; 
import vehicleResolvers from './customer/resolvers/vehicle-resolvers.js';

import { mergeTypeDefs } from '@graphql-tools/merge';


const typeDefs = mergeTypeDefs([baseTypeDefs, vehicleModelTypeDefs, vehicleInventoryTypeDefs,  customerTypeDefs, vehicleTypeDefs]); 

const resolvers = [vehicleInventoryResolvers, vehicleModelResolvers, customerResolvers, vehicleResolvers]; 

export { typeDefs, resolvers };
