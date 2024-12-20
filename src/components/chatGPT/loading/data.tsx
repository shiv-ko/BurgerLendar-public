// quotes.ts
export interface Quote {
    text: string;
    author: string;
  }
  
  export const MotivationQuotes: Quote[] = [
    { text: "成功は最終目標ではないし、失敗は致命的ではない。大切なのは続ける勇気である。", author: "ウィンストン・チャーチル" },
    { text: "素晴らしい仕事をする唯一の方法は、自分がやっていることを愛することだ。", author: "スティーブ・ジョブズ" },
    { text: "信じることができれば、もう半分は達成されたようなものだ。", author: "セオドア・ルーズベルト" },
    { text: "止まない限り、どんなにゆっくり進んでも問題はない。", author: "孔子" },
    { text: "目標を立てるには歳をとりすぎることはないし、新しい夢を見るには遅すぎることもない。", author: "C.S. ルイス" },
    { text: "目標を達成したことによって得られるものよりも、達成する過程で自分がどう変わるかの方が重要だ。", author: "ジグ・ジグラー" }
  ];

  export const NonMotivationQuotes: Quote[] = [
    { text: "一度たりとも落ちたことがない者は、新しい挑戦に対する勇気を持っていない。", author: "ウィンストン・チャーチル" },
    { text: "過去の成功は未来の成功を保証しないが、失敗も同じくらいの確実さで未来の成功を保証しない。", author: "ジョン・C・マクスウェル" },
    { text: "あなたができること、それができないことに注意を向けるよりも、あなたができることに注意を向けることを選びなさい。", author: "トーマス・エジソン" },
    { text: "成功するための最初のステップは、自分自身が何を望んでいるかを理解することだ。", author: "ジム・ローン" },
    { text: "私たちが直面する最大の敗北は、目標にたどり着く前に投げ出すことだ。", author: "ヴィンセント・L・ロンバルディ" },
    { text: "人生はたいてい、急がば回れの方が、自分が目指す方向に近づくことができる。", author: "ウィリアム・シェイクスピア" }
];

export const DefoMotivationQuotes: Quote[] = [
  { text: "成功は、日々の努力と継続的な行動の積み重ねから生まれる。", author: "コンラート・ヒルトン" },
  { text: "明日やることを今日やるな。今日やることを明日やれ。", author: "ベンジャミン・フランクリン" },
  { text: "あなたは自分ができると信じる限り、何でも成し遂げることができる。", author: "テオドア・ルーズベルト" },
  { text: "成功への最も確実な道は、自分の才能を最大限に活かし、最大限に開発することだ。", author: "ジョン・C・マクスウェル" },
  { text: "自分がどれだけ強いかではなく、どれだけ困難な状況に立ち向かったかで自分を評価せよ。", author: "ブルース・リー" },
  { text: "成功は、努力を続ける者にしか手に入れられない。", author: "ナポレオン・ヒル" }
];


  