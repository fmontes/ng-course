import { inject } from '@angular/core';

import { ResolveFn } from '@angular/router';

export const userResolver: ResolveFn<unknown> = (route, state) => {
  // const username = route.params['username'];
  // const firestore = inject(Firestore);

  // const q = query<Data>(
  //   collection(firestore, 'users') as Query<Data>,
  //   where('username', '==', username)
  // );

  // return getDocs(q).then((querySnapshot) => {
  //   const [doc] = querySnapshot.docs;
  //   return doc.data();
  // });

  return {
    username: 'fmontes',
    links: [{
      name: 'Twitter',
      url: 'https://twitter.com/fmontes',
    }]
  }
};
