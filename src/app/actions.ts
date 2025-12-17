'use server'

import PlankProofly from '@plank-proofly/api';

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// Helper to init client
function getClient(apiKey: string, baseURL: string) {
  return new PlankProofly({ apiKey, baseURL });
}

function handleError(error: unknown): { success: false; error: string } {
  const message = error instanceof Error ? error.message : String(error);
  return { success: false, error: message };
}

export async function getFacebookFriendsAction(apiKey: string, baseURL: string, params: PlankProofly.GetFacebookFriendCreateParams): Promise<ActionResult<PlankProofly.GetFacebookFriendCreateResponse>> {
  try {
    const client = getClient(apiKey, baseURL);
    const data = await client.getFacebookFriends.create(params);
    return { success: true, data };
  } catch (error) {
    return handleError(error);
  }
}

export async function checkFacebookFriendsAction(apiKey: string, baseURL: string, params: PlankProofly.CheckFacebookFriendCreateParams): Promise<ActionResult<PlankProofly.CheckFacebookFriendCreateResponse>> {
  try {
    const client = getClient(apiKey, baseURL);
    const data = await client.checkFacebookFriends.create(params);
    return { success: true, data };
  } catch (error) {
    return handleError(error);
  }
}

export async function findMutualFriendsAction(apiKey: string, baseURL: string, params: PlankProofly.FindMutualFriendCreateParams): Promise<ActionResult<PlankProofly.FindMutualFriendCreateResponse>> {
  try {
    const client = getClient(apiKey, baseURL);
    const data = await client.findMutualFriends.create(params);
    return { success: true, data };
  } catch (error) {
    return handleError(error);
  }
}

export async function searchProfilesAction(apiKey: string, baseURL: string, params: PlankProofly.ProfileSearchParams): Promise<ActionResult<PlankProofly.ProfileSearchResponse>> {
  try {
    const client = getClient(apiKey, baseURL);
    const data = await client.profiles.search(params);
    return { success: true, data };
  } catch (error) {
    return handleError(error);
  }
}


export async function verifyProfilePhotoAction(apiKey: string, baseURL: string, params: PlankProofly.VerifyProfilePhotoVerifyParams): Promise<ActionResult<PlankProofly.VerifyProfilePhotoVerifyResponse>> {
  try {
    const client = getClient(apiKey, baseURL);
    const data = await client.verifyProfilePhoto.verify(params);
    return { success: true, data };
  } catch (error) {
    return handleError(error);
  }
}

export async function searchByLocationOccupationAction(apiKey: string, baseURL: string, params: PlankProofly.SearchByLocationOccupationCreateParams): Promise<ActionResult<PlankProofly.SearchByLocationOccupationCreateResponse>> {
  try {
    const client = getClient(apiKey, baseURL);
    const data = await client.searchByLocationOccupation.create(params);
    return { success: true, data };
  } catch (error) {
    return handleError(error);
  }
}

export async function buildConnectionGraphAction(apiKey: string, baseURL: string, params: PlankProofly.ProfileBuildConnectionGraphParams): Promise<ActionResult<PlankProofly.ProfileBuildConnectionGraphResponse>> {
  try {
    const client = getClient(apiKey, baseURL);
    const data = await client.profiles.buildConnectionGraph(params);
    return { success: true, data };
  } catch (error) {
    return handleError(error);
  }
}

export async function fetchProfileInteractionsAction(apiKey: string, baseURL: string, params: PlankProofly.ProfileInteractionFetchParams): Promise<ActionResult<PlankProofly.ProfileInteractionFetchResponse>> {
  try {
    const client = getClient(apiKey, baseURL);
    const data = await client.profileInteractions.fetch(params);
    return { success: true, data };
  } catch (error) {
    return handleError(error);
  }
}

export async function getJobStatusAction(apiKey: string, baseURL: string, jobId: string): Promise<ActionResult<PlankProofly.JobRetrieveStatusResponse>> {
  try {
    const client = getClient(apiKey, baseURL);
    const data = await client.jobs.retrieveStatus(jobId);
    return { success: true, data };
  } catch (error) {
    return handleError(error);
  }
}

