import { AlephUniverse } from '@network-engine/aleph-lang';

// El servidor MCP mantiene una instancia en memoria para exponer su estado como Resource
// y permitir mutaciones vía Tools.
export const alephInstance = new AlephUniverse('MCP-Simulation');
