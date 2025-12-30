export const GET_FACEBOOK_FRIENDS_EXAMPLE = `import PlankProofly from '@plank-proofly/api';

const client = new PlankProofly({
  apiKey: 'YOUR_API_KEY', // defaults to process.env['X_API_KEY']
});

async function main() {
  const friends = await client.getFacebookFriends.create({
    targetFacebookId: 'john.smith', // or '10001234567890'
  });

  console.log(friends);
}

main();`;

export const CHECK_FACEBOOK_FRIENDS_EXAMPLE = `import PlankProofly from '@plank-proofly/api';

const client = new PlankProofly({
  apiKey: 'YOUR_API_KEY',
});

async function main() {
  const result = await client.checkFacebookFriends.create({
    targetFacebookId: 'john.smith',
    candidateIds: ['jane.doe', '10001234567891']
  });

  console.log(result);
}

main();`;

export const FIND_MUTUAL_FRIENDS_EXAMPLE = `import PlankProofly from '@plank-proofly/api';

const client = new PlankProofly({
  apiKey: 'YOUR_API_KEY',
});

async function main() {
  const mutualFriends = await client.findMutualFriends.create({
    userIds: ['john.smith', 'jane.doe']
  });

  console.log(mutualFriends);
}

main();`;

export const SEARCH_BY_LOCATION_OCCUPATION_EXAMPLE = `import PlankProofly from '@plank-proofly/api';

const client = new PlankProofly({
  apiKey: 'YOUR_API_KEY',
});

async function main() {
  const profiles = await client.searchByLocationOccupation.create({
    city: 'San Francisco',
    state: 'CA', // Optional
    occupation: 'Software Engineer'
  });

  console.log(profiles);
}

main();`;

export const SEARCH_PROFILES_EXAMPLE = `import PlankProofly from '@plank-proofly/api';

const client = new PlankProofly({
  apiKey: 'YOUR_API_KEY',
});

async function main() {
  const searchResults = await client.profiles.search({
    name: 'John Doe',
    location: 'New York',
    birthYear: 1990,
    // Other optional fields:
    // email: 'john@example.com',
    // dateOfBirth: '1990-01-01',
    // subCategory: 'current', // or 'hometown'
    // photoUrl: 'https://example.com/photo.jpg',
    // knownAssociates: ['Jane Smith'],
    // additionalInstructions: 'Look for someone who works at Tech Corp',
    // minConfidenceScore: 0.8
  });

  console.log(searchResults);
}

main();`;

export const BUILD_CONNECTION_GRAPH_EXAMPLE = `import PlankProofly from '@plank-proofly/api';

const client = new PlankProofly({
  apiKey: 'YOUR_API_KEY',
});

async function main() {
  const graph = await client.profiles.buildConnectionGraph({
    profiles: [
      { name: 'John Doe', location: 'New York' },
      { name: 'Jane Smith', email: 'jane@example.com' }
    ],
    globalFilters: {
      location: 'New York', // Optional: filter everyone by this location
      // subCategory: 'current'
    }
  });

  console.log(graph);
}

main();`;

export const FETCH_PROFILE_INTERACTIONS_EXAMPLE = `import PlankProofly from '@plank-proofly/api';

const client = new PlankProofly({
  apiKey: 'YOUR_API_KEY',
});

async function main() {
  const interactions = await client.profileInteractions.fetch({
    profileId: 'john.smith', // OR profileUrl: 'https://facebook.com/john.smith'
    postLimit: 5 // Default is 5, max 20
  });

  console.log(interactions);
}

main();`;

export const VERIFY_PROFILE_PHOTO_EXAMPLE = `import PlankProofly from '@plank-proofly/api';

const client = new PlankProofly({
  apiKey: 'YOUR_API_KEY',
});

async function main() {
  const verification = await client.verifyProfilePhoto.verify({
    photoUrl: 'https://example.com/verification-photo.jpg',
    profileUrl: 'https://www.facebook.com/john.smith',
    additionalInstructions: 'Focus on facial features' // Optional
  });

  console.log(verification);
}

main();`;

export const GET_JOB_STATUS_EXAMPLE = `import PlankProofly from '@plank-proofly/api';

const client = new PlankProofly({
  apiKey: 'YOUR_API_KEY',
});

async function main() {
  // 'job_id' is returned from async operations like searchProfiles
  const status = await client.jobs.retrieveStatus('job_1234567890');

  console.log(status);
}

main();`;

export const AUTO_RETRIEVE_JOB_STATUS_EXAMPLE = `import PlankProofly from '@plank-proofly/api';

const client = new PlankProofly({
  apiKey: 'YOUR_API_KEY',
});

async function main() {
  // Polls until job is complete
  const result = await client.jobs.autoRetrieveStatus('job_1234567890');

  console.log(result);
}

main();`;

export const FETCH_PHOTO_TAGS_EXAMPLE = `import PlankProofly from '@plank-proofly/api';

const client = new PlankProofly({
  apiKey: 'YOUR_API_KEY',
});

async function main() {
  const result = await client.photoTags.fetch({
    profileUrl: 'https://facebook.com/john.doe',
    photoLimit: 20, // Default is 10, max 50
    // Optional filters:
    // fbAccountIds: ['987654321', '555666777'],
    // fbAccountNames: ['Jane Smith', 'Bob Johnson']
  });

  console.log(\`Found \${result.tags.length} tagged accounts\`);
  console.log(\`Scanned \${result.photosScanned} photos\`);

  for (const tag of result.tags) {
    console.log(\`\${tag.name} - \${tag.profileUrl}\`);
  }
}

main();`;
