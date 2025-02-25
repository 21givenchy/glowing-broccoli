import { Document, SimpleDocumentStore, VectorStoreIndex } from "llamaindex";
import { storageContextFromDefaults } from "llamaindex/storage/StorageContext";

export async function getDataSource(params?: any) {
  const persistDir = process.env.STORAGE_CACHE_DIR;
  if (!persistDir) {
    throw new Error("STORAGE_CACHE_DIR environment variable is required!");
  }
  const storageContext = await storageContextFromDefaults({
    persistDir,
  });

  const numberOfDocs = Object.keys(
    (storageContext.docStore as SimpleDocumentStore).toDict(),
  ).length;

  if (numberOfDocs === 0) {
    console.warn('No documents found in store, creating new index')
    return await VectorStoreIndex.fromDocuments([], {
      storageContext
    });
  }
  return await VectorStoreIndex.fromStorageContext( {
    storageContext,
  });
}
